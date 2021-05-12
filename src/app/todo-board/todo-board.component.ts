import { Component } from '@angular/core';
import { BoardInterface } from '../../lib/interfaces/board.interface';
import { BoardService } from '../../lib/services/board.service';
import { DrawerInterface } from '../../lib/interfaces/drawer.interface';
import { StateService } from '../../lib/services/state.service';
import { TaskService } from '../../lib/services/task.service';

@Component({
  selector: 'app-todo-board',
  templateUrl: './todo-board.component.html',
  styleUrls: ['./todo-board.component.scss'],
})
export class TodoBoardComponent {
  activeId: number;
  activeBoard: BoardInterface;
  boards: BoardInterface[];

  constructor(private boardService: BoardService,
              private stateService: StateService,
              private taskService: TaskService) {
    this.boards = this.boardService.GetMany();
    this.activeBoard = this.boards[0];
    this.activeId = this.activeBoard?.id;
  }

  selectBoard(board: any): void {
    this.activeBoard = board;
    this.activeId = this.activeBoard?.id;
  }

  refreshBoards(): void {
    this.boards = this.boardService.GetMany();
  }

  boardAction(result: DrawerInterface<BoardInterface>): void {
    if (!result) { return; }

    if (result.action === 'SAVE') {
      this.refreshBoards();
      this.activeBoard = this.boards.find(board => board.id === this.activeId);
    } else if (result?.action === 'DELETE') {
      const boardIndex = this.boards.findIndex(board => board.id === this.activeId);
      this.boardService.deleteOne(this.activeBoard);
      this.stateService.deleteMany({boardId: this.activeId});
      this.taskService.deleteMany({boardId: this.activeId});
      this.refreshBoards();

      if (boardIndex === -1) {
        this.activeBoard = null;
        this.activeId = null;
      } else {
        if (boardIndex + 1 >= this.boards.length - 1) {
          this.selectBoard(this.boards[0]);
        } else {
          this.selectBoard(this.boards[boardIndex + 1]);
        }
      }
    }
  }
}
