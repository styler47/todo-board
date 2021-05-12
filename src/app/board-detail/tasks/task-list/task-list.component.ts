import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BoardInterface } from '../../../../lib/interfaces/board.interface';
import { BoardDetailService } from '../../../../lib/services/board-detail.service';
import { TaskInterface } from '../../../../lib/interfaces/task.interface';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StateInterface } from '../../../../lib/interfaces/state.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() board: BoardInterface;
  tasksSub: Subscription;
  statesSub: Subscription;
  tasks: TaskInterface[];
  statesDictionary: {[key: number]: StateInterface};

  constructor(private boardDetailService: BoardDetailService) { }

  ngOnInit(): void {
    this.tasksSub = this.boardDetailService.tasks$.pipe(
      tap((data) => {
        this.tasks = data;
      })
    ).subscribe();
    this.statesSub = this.boardDetailService.states$.pipe(
      tap(data => {
        this.statesDictionary = data
          .reduce((obj, item) => {
            return {
              ...obj,
              [item.id]: item,
            };
          }, {});
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.tasksSub.unsubscribe();
    this.statesSub.unsubscribe();
  }

  stateName(stateId: number): string {
    return this.statesDictionary[stateId].name;
  }
}
