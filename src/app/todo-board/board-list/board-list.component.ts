import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BoardInterface } from '../../../lib/interfaces/board.interface';
import { BoardModalComponent } from '../../../lib/components/board-modal/board-modal.component';
import { DrawerInterface } from '../../../lib/interfaces/drawer.interface';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent {
  @Input() activeBoard: BoardInterface;
  @Input() boards: BoardInterface[];
  @Output() selectBoard = new EventEmitter<BoardInterface>();
  @Output() refreshBoards = new EventEmitter();

  constructor(private nzDrawerService: NzDrawerService) {}

  addNew(): void {
    const drawerRef = this.nzDrawerService.create<BoardModalComponent, undefined, DrawerInterface<BoardInterface>>({
      nzTitle: 'Add board',
      nzContent: BoardModalComponent,
      nzContentParams: {
        board: {}
      },
      nzWidth: 500
    });

    drawerRef.afterClose.subscribe(result => {
      if (result?.action === 'SAVE') {
        this.refreshBoards.emit();
        this.selectBoard.emit(result.data);
      }
    });
  }
}
