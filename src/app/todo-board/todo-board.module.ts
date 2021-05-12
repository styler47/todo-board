import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoBoardComponent } from './todo-board.component';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardDetailModule } from '../board-detail/board-detail.module';
import { RouterModule } from '@angular/router';
import { BoardService } from '../../lib/services/board.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BoardModalModule } from '../../lib/components/board-modal/board-modal.module';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    TodoBoardComponent,
    BoardListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    BoardDetailModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    BoardModalModule,
    NzButtonModule
  ],
  providers: [
    BoardService
  ]
})
export class TodoBoardModule { }
