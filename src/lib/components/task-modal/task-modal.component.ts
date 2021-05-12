import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { TaskInterface } from '../../interfaces/task.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DrawerInterface } from '../../interfaces/drawer.interface';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {
  @Input() task: Partial<TaskInterface>;
  form: FormGroup;

  constructor(private drawerRef: NzDrawerRef,
              private fb: FormBuilder,
              private taskService: TaskService,
              private modalService: NzModalService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.task.name, [Validators.required]],
      description: [this.task.description],
    });
  }

  isEdit(): boolean {
    return Number.isInteger(this.task.id);
  }

  submit(): void {
    if (this.form.valid) {
      const task = this.taskService.saveOne(Object.assign(this.task, this.form.value));
      this.drawerRef.close({
        action: 'SAVE',
        data: task
      } as DrawerInterface<TaskInterface>);
    }
  }

  close(): void {
    if (!this.form.pristine) {
      this.modalService.confirm({
        nzTitle: 'Do you want to leave task without saving?',
        nzOkText: 'Yes',
        nzOnOk: () => this.drawerRef.close()
      });
    } else {
      this.drawerRef.close();
    }
  }

  remove(): void {
    this.taskService.deleteOne(this.task as TaskInterface);
    this.drawerRef.close({
      action: 'DELETE'
    } as DrawerInterface<TaskInterface>);
  }
}
