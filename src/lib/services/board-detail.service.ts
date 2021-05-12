import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskInterface } from '../interfaces/task.interface';
import { StateInterface } from '../interfaces/state.interface';
import { StateService } from './state.service';
import { TaskService } from './task.service';

@Injectable()
export class BoardDetailService {
  private readonly statesSubject: BehaviorSubject<StateInterface[]> = new BehaviorSubject<StateInterface[]>([]);
  private readonly tasksSubject: BehaviorSubject<TaskInterface[]> = new BehaviorSubject<TaskInterface[]>([]);

  readonly states$: Observable<StateInterface[]> = this.statesSubject.asObservable();
  readonly tasks$: Observable<TaskInterface[]> = this.tasksSubject.asObservable();

  constructor(private stateService: StateService,
              private taskService: TaskService) {}

  updateBoard(boardId: number): void {
    const states = this.stateService.getMany(boardId);
    this.statesSubject.next(states);

    const tasks = this.taskService.getMany(boardId);
    this.tasksSubject.next(tasks);
  }

  saveOneTask(task: TaskInterface): void {
    const tasks = [...this.tasksSubject.value];
    const id = tasks.findIndex(t => t.id === task.id);

    if (id === -1) {
      tasks.push(task);
    } else {
      tasks[id] = task;
    }

    this.tasksSubject.next(tasks);
  }

  saveManyTasks(tasks: TaskInterface[]): void {
    const localTasks = [...this.tasksSubject.value];

    for (const task of tasks) {
      const id = localTasks.findIndex(t => t.id === task.id);

      if (id === -1) {
        localTasks.push(task);
      } else {
        localTasks[id] = task;
      }
    }
    this.tasksSubject.next(localTasks);
  }

  deleteOneTask(task: TaskInterface): void {
    const tasks = [...this.tasksSubject.value];
    const id = tasks.findIndex(t => t.id === task.id);
    tasks.splice(id, 1);

    this.tasksSubject.next(tasks);
  }

  deleteManyTask(params: {stateId?: number, boardId?: number}): void {
    let tasks = [...this.tasksSubject.value];

    if (params.stateId) {
      tasks = tasks.filter(task => task.stateId !== params.stateId);
    }
    if (params.boardId) {
      tasks = tasks.filter(task => task.boardId !== params.boardId);
    }

    this.tasksSubject.next(tasks);
  }

  saveOneState(state: StateInterface): void {
    const states = [...this.statesSubject.value];
    const id = states.findIndex(t => t.id === state.id);

    if (id === -1) {
      states.push(state);
    } else {
      states[id] = state;
    }

    this.statesSubject.next(states);
  }

  saveManyStates(states: StateInterface[]): void {
    const localStates = [...this.statesSubject.value];

    for (const task of states) {
      const id = localStates.findIndex(t => t.id === task.id);

      if (id === -1) {
        localStates.push(task);
      } else {
        localStates[id] = task;
      }
    }
    this.statesSubject.next(localStates);
  }

  deleteOneState(state: StateInterface): void {
    const states = [...this.statesSubject.value];
    const id = states.findIndex(t => t.id === state.id);
    states.splice(id, 1);

    this.statesSubject.next(states);
  }

  deleteManyState(params: {boardId?: number}): void {
    let states = [...this.statesSubject.value];

    if (params.boardId) {
      states = states.filter(state => state.boardId !== params.boardId);
    }

    this.statesSubject.next(states);
  }
}
