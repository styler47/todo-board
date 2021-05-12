import { Component, Input } from '@angular/core';
import { StateInterface } from '../../../../lib/interfaces/state.interface';
import { BoardDetailService } from '../../../../lib/services/board-detail.service';
import { StateModalComponent } from '../../../../lib/components/state-modal/state-modal.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { DrawerInterface } from '../../../../lib/interfaces/drawer.interface';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent {
  @Input() state: StateInterface;

  constructor(private boardDetailService: BoardDetailService,
              private nzDrawerService: NzDrawerService) { }

  editState(): void {
    const drawerRef = this.nzDrawerService.create<StateModalComponent, undefined, DrawerInterface<StateInterface>>({
      nzTitle: 'Edit state',
      nzContent: StateModalComponent,
      nzContentParams: {
        state: Object.assign({}, this.state)
      },
      nzWidth: 500
    });

    drawerRef.afterClose.subscribe(result => {
      if (!result) { return; }

      if (result.action === 'SAVE') {
        this.boardDetailService.saveOneState(result.data);
      } else if (result.action === 'DELETE') {
        this.boardDetailService.deleteOneState(this.state);
        this.boardDetailService.deleteManyTask({stateId: this.state.id});
      }
    });
  }
}
