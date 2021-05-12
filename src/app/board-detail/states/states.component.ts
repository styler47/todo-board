import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { BoardDetailService } from '../../../lib/services/board-detail.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { StateModalComponent } from '../../../lib/components/state-modal/state-modal.component';
import { BoardInterface } from '../../../lib/interfaces/board.interface';
import { DrawerInterface } from '../../../lib/interfaces/drawer.interface';
import { StateInterface } from '../../../lib/interfaces/state.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { StateService } from '../../../lib/services/state.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
  @Input() board: BoardInterface;
  states$: Observable<StateInterface[]>;

  constructor(private element: ElementRef,
              private boardDetailService: BoardDetailService,
              private nzDrawerService: NzDrawerService,
              private stateService: StateService) { }

  ngOnInit(): void {
    this.states$ = this.boardDetailService.states$.pipe(
      map(states => states.sort((first, second) => first.order - second.order))
    );
  }

  @HostListener('mousewheel', ['$event'])
  mouseScroll(event: WheelEvent): void {
    this.element.nativeElement.scrollLeft += event.deltaY * 0.5;
    event.preventDefault();
  }

  addNewState(): void {
    const drawerRef = this.nzDrawerService.create<StateModalComponent, undefined, DrawerInterface<StateInterface>>({
      nzTitle: 'New state',
      nzContent: StateModalComponent,
      nzContentParams: {
        state: {
          boardId: this.board.id
        }
      },
      nzWidth: 500
    });

    drawerRef.afterClose.subscribe(result => {
      if (!result) { return; }

      if (result.action === 'SAVE') {
        this.boardDetailService.saveOneState(result.data);
      }
    });
  }

  drop(event: CdkDragDrop<StateInterface[]>): void {
    const states = [...event.container.data];

    moveItemInArray(states, event.previousIndex, event.currentIndex);

    for (const [index, ] of states.entries()) {
      states[index].order = Number(index);
    }

    const saved = this.stateService.saveMany(states);
    this.boardDetailService.saveManyStates(saved);
  }
}
