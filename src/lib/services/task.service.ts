import { Injectable } from '@angular/core';
import { TaskInterface } from '../interfaces/task.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private localStorage: LocalStorageService) { }

  getMany(boardId?: number): TaskInterface[] {
    let tasks = this.localStorage.getItem<TaskInterface[]>('tasks', []);

    if (boardId) {
      tasks = tasks.filter(task => task.boardId === boardId);
    }

    return tasks;
  }

  getLastId(states: TaskInterface[]): number {
    if (states.length === 0) {
      return 0;
    }

    let maxId = states[0].id;
    for (let i = 1; i < states.length; i++) {
      if (states[i].id > maxId) {
        maxId = states[i].id;
      }
    }

    return maxId;
  }

  saveOne(task: TaskInterface): TaskInterface {
    if (task.id) {
      return this.update(task);
    } else {
      return this.insert(task);
    }
  }

  insert(task: TaskInterface): TaskInterface {
    const tasks = this.localStorage.getItem<TaskInterface[]>('tasks', []);
    task.id = this.getLastId(tasks) + 1;
    tasks.push(task);
    this.localStorage.setItem('tasks', tasks);

    return task;
  }

  update(task: TaskInterface): TaskInterface {
    const tasks = this.localStorage.getItem<TaskInterface[]>('tasks', []);
    const id = tasks.findIndex(t => t.id === task.id);
    if (id !== -1) {
      tasks[id] = Object.assign(tasks[id], task);
      this.localStorage.setItem('tasks', tasks);

      return tasks[id];
    } else {
      return task;
    }
  }

  saveMany(tasks: TaskInterface[]): TaskInterface[] {
    const savedTasks = [];
    for (const task of tasks) {
      savedTasks.push(this.saveOne(task));
    }

    return savedTasks;
  }

  deleteOne(state: TaskInterface): void {
    const tasks = this.localStorage.getItem<TaskInterface[]>('tasks', []);
    const id = tasks.findIndex(t => t.id === state.id);
    if (id === -1) { return; }
    tasks.splice(id, 1);

    this.localStorage.setItem('tasks', tasks);
  }

  deleteMany(params: {stateId?: number, boardId?: number}): void {
    let tasks = this.localStorage.getItem<TaskInterface[]>('tasks', []);
    if (params.stateId) {
      tasks = tasks.filter(task => task.stateId !== params.stateId);
    }
    if (params.boardId) {
      tasks = tasks.filter(task => task.boardId !== params.boardId);
    }
    this.localStorage.setItem('tasks', tasks);
  }
}
