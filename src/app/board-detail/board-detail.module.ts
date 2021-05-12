import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardDetailComponent } from './board-detail.component';
import { StatesComponent } from './states/states.component';
import { TaskComponent } from './tasks/task/task.component';
import { StateComponent } from './states/state/state.component';
import { NonIdealStateModule } from '../../lib/components/non-ideal-state/non-ideal-state.module';
import { StateService } from '../../lib/services/state.service';
import { TaskService } from '../../lib/services/task.service';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { TasksComponent } from './tasks/tasks.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StateModalComponent } from '../../lib/components/state-modal/state-modal.component';
import { TaskModalModule } from '../../lib/components/task-modal/task-modal.module';
import { StateModalModule } from '../../lib/components/state-modal/state-modal.module';

@NgModule({
  declarations: [
    BoardDetailComponent,
    StatesComponent,
    TaskComponent,
    StateComponent,
    TasksComponent,
    TaskListComponent
  ],
  exports: [
    BoardDetailComponent
  ],
  imports: [
    CommonModule,
    NonIdealStateModule,
    NzTabsModule,
    NzCardModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSpaceModule,
    NzTableModule,
    DragDropModule,
    StateModalModule,
    TaskModalModule
  ],
  providers: [
    StateService,
    TaskService,
    NzDrawerService,
    NzModalService
  ]
})
export class BoardDetailModule { }
