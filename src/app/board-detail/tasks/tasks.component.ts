import { Component, Input, OnInit } from '@angular/core';
import { TaskInterface } from '../../../lib/interfaces/task.interface';
import { TaskModalComponent } from '../../../lib/components/task-modal/task-modal.component';
import { DrawerInterface } from '../../../lib/interfaces/drawer.interface';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { BoardDetailService } from '../../../lib/services/board-detail.service';
import { StateInterface } from '../../../lib/interfaces/state.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../../lib/services/task.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() state: StateInterface;
  tasks$: Observable<TaskInterface[]>;

  constructor(private nzDrawerService: NzDrawerService,
              private boardDetailService: BoardDetailService,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.boardDetailService.tasks$.pipe(
      map(tasks => tasks
        .filter(task => task.stateId === this.state.id)
        .sort((first, second) => first.order - second.order)
      )
    );
  }

  addNewTask(): void {
    const drawerRef = this.nzDrawerService.create<TaskModalComponent, undefined, DrawerInterface<TaskInterface>>({
      nzTitle: 'Add task',
      nzContent: TaskModalComponent,
      nzContentParams: {
        task: {
          stateId: this.state.id,
          boardId: this.state.boardId
        }
      },
      nzWidth: 500
    });

    drawerRef.afterClose.subscribe(result => {
      if (!result) { return; }

      if (result.action === 'SAVE') {
        this.boardDetailService.saveOneTask(result.data);
      }
    });
  }

  drop(event: CdkDragDrop<TaskInterface[]>): void {
    let tasks: TaskInterface[];

    if (event.previousContainer === event.container) {
      tasks = this.moveInSame(event);
    } else {
      tasks = this.moveInDifferent(event);
    }
    const saved = this.taskService.saveMany(tasks);
    this.boardDetailService.saveManyTasks(saved);
  }

  moveInSame(event: CdkDragDrop<TaskInterface[]>): TaskInterface[] {
    let tasks = [...event.container.data];

    moveItemInArray(tasks, event.previousIndex, event.currentIndex);

    tasks = this.updateOrder(tasks);

    return tasks;
  }

  moveInDifferent(event: CdkDragDrop<TaskInterface[]>): TaskInterface[] {
    let taskFrom = [...event.previousContainer.data];
    let taskTo = [...event.container.data];

    transferArrayItem(taskFrom,
      taskTo,
      event.previousIndex,
      event.currentIndex);

    taskFrom = this.updateOrder(taskFrom);
    taskTo = this.updateOrder(taskTo, true);

    return [...taskFrom, ...taskTo];
  }

  updateOrder(tasks: TaskInterface[], setState: boolean = false): TaskInterface[] {
    for (const [index, ] of tasks.entries()) {
      tasks[index].order = Number(index);

      if (setState) {
        tasks[index].stateId = this.state.id;
      }
    }

    return tasks;
  }
}
