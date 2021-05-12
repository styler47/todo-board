import { NgModule } from '@angular/core';
import { TaskModalComponent } from './task-modal.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TaskModalComponent],
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSpaceModule,
    NzButtonModule,
    CommonModule
  ],
  exports: [
    TaskModalComponent
  ]
})
export class TaskModalModule { }
