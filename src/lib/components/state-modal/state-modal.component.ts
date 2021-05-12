import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StateInterface } from '../../interfaces/state.interface';
import { DrawerInterface } from '../../interfaces/drawer.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-state-modal',
  templateUrl: './state-modal.component.html',
  styleUrls: ['./state-modal.component.scss']
})
export class StateModalComponent implements OnInit {
  @Input() state: Partial<StateInterface>;
  form: FormGroup;

  constructor(private drawerRef: NzDrawerRef,
              private fb: FormBuilder,
              private stateService: StateService,
              private modalService: NzModalService,
              private taskService: TaskService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.state.name ?? '', [Validators.required]]
    });
  }

  isEdit(): boolean {
    return Number.isInteger(this.state.id);
  }

  submit(): void {
    if (this.form.valid) {
      const state = this.stateService.saveOne(Object.assign(this.state, this.form.value));
      this.drawerRef.close({
        action: 'SAVE',
        data: state
      } as DrawerInterface<StateInterface>);
    }
  }

  cancel(): void {
    if (!this.form.pristine) {
      this.modalService.confirm({
        nzTitle: 'Do you want to leave state without saving?',
        nzOkText: 'Yes',
        nzOnOk: () => this.drawerRef.close()
      });
    } else {
      this.drawerRef.close();
    }
  }

  remove(): void {
    this.stateService.deleteOne(this.state as StateInterface);
    this.taskService.deleteMany({stateId: this.state.id});
    this.drawerRef.close({
      action: 'DELETE'
    } as DrawerInterface<StateInterface>);
  }
}
