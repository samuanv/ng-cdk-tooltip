import { Component, EventEmitter, OnDestroy, Output, TemplateRef, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'ng-cdk-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  animations: [
    trigger('state', [
      state('initial, void, hidden', style({transform: 'scale(0)'})),
      state('visible', style({transform: 'scale(1)'})),
      transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
      transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
    ])
  ],
})
export class NgCdkTooltipComponent implements OnDestroy {
  @ViewChild(TemplateRef)
  templateRef: TemplateRef<any>;

  id: String;
  @Output('ngCdkClosed')
  closed = new EventEmitter<void>();

  showCloseButton = false;

  constructor() { }

  ngOnDestroy() {
    this.closed.emit();
    this.closed.complete();
  }

  closeTooltip() {
    this.closed.emit();
  }
}
