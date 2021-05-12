import { Component, Input } from '@angular/core';
import { TaskInterface } from '../../../../lib/interfaces/task.interface';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { TaskModalComponent } from '../../../../lib/components/task-modal/task-modal.component';
import { BoardDetailService } from '../../../../lib/services/board-detail.service';
import { DrawerInterface } from '../../../../lib/interfaces/drawer.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: TaskInterface;

  constructor(private drawerService: NzDrawerService,
              private boardDetailService: BoardDetailService) { }

  openDrawer(): void {
    const drawerRef = this.drawerService.create<TaskModalComponent, undefined, DrawerInterface<TaskInterface>>({
      nzTitle: 'Edit task',
      nzWidth: '500px',
      nzContent: TaskModalComponent,
      nzContentParams: {
        task: Object.assign({}, this.task)
      }
    });

    drawerRef.afterClose.subscribe(result => {
      if (!result) { return; }

      if (result.action === 'SAVE') {
        this.boardDetailService.saveOneTask(result.data);
      } else if (result.action === 'DELETE') {
        this.boardDetailService.deleteOneTask(this.task);
      }
    });
  }
}
