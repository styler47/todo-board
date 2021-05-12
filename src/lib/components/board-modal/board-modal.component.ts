import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { StateService } from '../../services/state.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TaskService } from '../../services/task.service';
import { DrawerInterface } from '../../interfaces/drawer.interface';
import { BoardInterface } from '../../interfaces/board.interface';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss']
})
export class BoardModalComponent implements OnInit {
  @Input() board: Partial<BoardInterface>;
  form: FormGroup;

  constructor(private drawerRef: NzDrawerRef,
              private fb: FormBuilder,
              private stateService: StateService,
              private taskService: TaskService,
              private modalService: NzModalService,
              private boardService: BoardService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.board.name ?? '', [Validators.required]]
    });
  }

  isEdit(): boolean {
    return Number.isInteger(this.board.id);
  }

  submit(): void {
    if (this.form.valid) {
      const state = this.boardService.saveOne(Object.assign(this.board, this.form.value));
      this.drawerRef.close({
        action: 'SAVE',
        data: state
      } as DrawerInterface<BoardInterface>);
    }
  }

  cancel(): void {
    if (!this.form.pristine) {
      this.modalService.confirm({
        nzTitle: 'Do you want to leave board without saving?',
        nzOkText: 'Yes',
        nzOnOk: () => this.drawerRef.close()
      });
    } else {
      this.drawerRef.close();
    }
  }

  remove(): void {
    this.boardService.deleteOne(this.board as BoardInterface);
    this.stateService.deleteMany({boardId: this.board.id});
    this.taskService.deleteMany({boardId: this.board.id});
    this.drawerRef.close({
      action: 'DELETE'
    } as DrawerInterface<BoardInterface>);
  }
}
