import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-non-ideal-state',
  templateUrl: './non-ideal-state.component.html',
  styleUrls: ['./non-ideal-state.component.scss']
})
export class NonIdealStateComponent {
  @Input() heading: string = '';
  @Input() description: string = '';
  @Input() showIcon: boolean = true;
  @Input() icon: string = 'home';

  constructor() { }
}
