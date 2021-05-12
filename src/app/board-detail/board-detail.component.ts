import { Component, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { BoardInterface } from '../../lib/interfaces/board.interface';
import { BoardDetailService } from '../../lib/services/board-detail.service';
import { DrawerInterface } from '../../lib/interfaces/drawer.interface';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { BoardModalComponent } from '../../lib/components/board-modal/board-modal.component';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss'],
  providers: [BoardDetailService]
})
export class BoardDetailComponent implements OnChanges {
  @Input() selectedBoard: BoardInterface;
  @Output() boardAction: EventEmitter<DrawerInterface<BoardInterface>> = new EventEmitter<DrawerInterface<BoardInterface>>();

  constructor(public boardDetailService: BoardDetailService,
              private drawerService: NzDrawerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedBoard.currentValue !== changes.selectedBoard.previousValue) {
      if (this.selectedBoard) {
        this.boardDetailService.updateBoard(this.selectedBoard.id);
      }
    }
  }

  editBoard(): void {
    const drawerRef = this.drawerService.create<BoardModalComponent, undefined, DrawerInterface<BoardInterface>>({
      nzTitle: 'Edit board',
      nzWidth: '500px',
      nzContent: BoardModalComponent,
      nzContentParams: {
        board: Object.assign({}, this.selectedBoard)
      }
    });

    drawerRef.afterClose.subscribe(result => {
      this.boardAction.emit(result);
    });
  }
}
