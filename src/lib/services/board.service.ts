import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BoardInterface } from '../interfaces/board.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private localStorage: LocalStorageService) {}

  GetMany(): BoardInterface[] {
    return this.localStorage.getItem<BoardInterface[]>('boards', []);
  }

  getLastId(boards: BoardInterface[]): number {
    if (boards.length === 0) {
      return 0;
    }

    let maxId = boards[0].id;
    for (let i = 1; i < boards.length; i++) {
      if (boards[i].id > maxId) {
        maxId = boards[i].id;
      }
    }

    return maxId;
  }

  saveOne(board: BoardInterface): BoardInterface {
    if (board.id) {
      return this.updateOne(board);
    } else {
      return this.insertOne(board);
    }
  }

  insertOne(board: BoardInterface): BoardInterface {
    const boards = this.localStorage.getItem<BoardInterface[]>('boards', []);
    board.id = this.getLastId(boards) + 1;
    boards.push(board);
    this.localStorage.setItem('boards', boards);

    return board;
  }

  updateOne(board: BoardInterface): BoardInterface {
    const boards = this.localStorage.getItem<BoardInterface[]>('boards', []);
    const id = boards.findIndex(t => t.id === board.id);
    if (id !== -1) {
      boards[id] = Object.assign(boards[id], board);
      this.localStorage.setItem('boards', boards);

      return boards[id];
    } else {
      return board;
    }
  }

  deleteOne(board: BoardInterface): void {
    const boards = this.localStorage.getItem<BoardInterface[]>('boards', []);
    const id = boards.findIndex(t => t.id === board.id);
    if (id === -1) { return; }
    boards.splice(id, 1);

    this.localStorage.setItem('boards', boards);
  }
}
