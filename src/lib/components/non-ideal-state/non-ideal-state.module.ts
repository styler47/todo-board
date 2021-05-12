import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonIdealStateComponent } from './non-ideal-state.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    NonIdealStateComponent
  ],
  imports: [
    CommonModule,
    NzIconModule,
  ],
  exports: [
    NonIdealStateComponent
  ]
})
export class NonIdealStateModule { }
