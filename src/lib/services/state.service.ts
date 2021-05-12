import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { StateInterface } from '../interfaces/state.interface';
import { TaskInterface } from '../interfaces/task.interface';

@Injectable()
export class StateService {
  constructor(private localStorage: LocalStorageService) { }

  getMany(boardId?: number): StateInterface[] {
    let states = this.localStorage.getItem<StateInterface[]>('states', []);

    if (boardId) {
      states = states.filter(state => state.boardId === boardId);
    }

    return states;
  }

  getLastId(states: StateInterface[]): number {
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

  saveOne(state: StateInterface): StateInterface {
    if (state.id) {
      return this.updateOne(state);
    } else {
      return this.insertOne(state);
    }
  }

  insertOne(state: StateInterface): StateInterface {
    const states = this.localStorage.getItem<StateInterface[]>('states', []);
    state.id = this.getLastId(states) + 1;
    states.push(state);
    this.localStorage.setItem('states', states);

    return state;
  }

  updateOne(state: StateInterface): StateInterface {
    const states = this.localStorage.getItem<StateInterface[]>('states', []);
    const id = states.findIndex(t => t.id === state.id);
    if (id !== -1) {
      states[id] = Object.assign(states[id], state);
      this.localStorage.setItem('states', states);

      return states[id];
    } else {
      return state;
    }
  }

  saveMany(states: StateInterface[]): StateInterface[] {
    const savedStates = [];
    for (const task of states) {
      savedStates.push(this.saveOne(task));
    }

    return savedStates;
  }

  deleteOne(state: StateInterface): void {
    const states = this.localStorage.getItem<StateInterface[]>('states', []);
    const id = states.findIndex(t => t.id === state.id);
    if (id === -1) { return; }
    states.splice(id, 1);

    this.localStorage.setItem('states', states);
  }

  deleteMany(params: {boardId?: number}): void {
    let states = this.localStorage.getItem<TaskInterface[]>('states', []);
    if (params.boardId) {
      states = states.filter(item => item.boardId !== params.boardId);
    }
    this.localStorage.setItem('states', states);
  }
}
