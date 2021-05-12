import { NgModule } from '@angular/core';
import { BoardModalComponent } from './board-modal.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BoardModalComponent],
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzSpaceModule,
    NzButtonModule,
    NzInputModule,
    CommonModule
  ],
  exports: [
    BoardModalComponent
  ]
})
export class BoardModalModule { }
