import { Component, HostBinding, Input } from '@angular/core';
import { convertToBoolProperty } from '../helpers';

@Component({
  selector: 'nga-sidebar-header',
  template: `
    <ng-content></ng-content>
  `,
})
export class NgaSidebarHeaderComponent {
}

@Component({
  selector: 'nga-sidebar-content',
  template: `
    <ng-content></ng-content>
  `,
})
export class NgaSidebarContentComponent {
}

@Component({
  selector: 'nga-sidebar-footer',
  template: `
    <ng-content></ng-content>
  `,
})
export class NgaSidebarFooterComponent {
}

@Component({
  selector: 'nga-sidebar',
  styleUrls: ['./sidebar.component.scss'],
  template: `
    <div class="scrollable">
      <ng-content select="nga-sidebar-header"></ng-content>
      <div class="main-container">
        <ng-content></ng-content>
      </div>
      <ng-content select="nga-sidebar-footer"></ng-content>
    </div>
  `,
})
export class NgaSidebarComponent {

  static readonly STATE_EXPANDED: string = 'expanded';
  static readonly STATE_COLLAPSED: string = 'collapsed';
  static readonly STATE_COMPACTED: string = 'compacted';

  protected stateValue: string;

  @HostBinding('class.fixed') fixedValue: boolean = false;
  @HostBinding('class.right') rightValue: boolean = false;
  @HostBinding('class.left') leftValue: boolean = false;

  @HostBinding('class.expanded')
  get expanded() {
    return this.stateValue === NgaSidebarComponent.STATE_EXPANDED;
  }
  @HostBinding('class.collapsed')
  get collapsed() {
    return this.stateValue === NgaSidebarComponent.STATE_COLLAPSED;
  }
  @HostBinding('class.compacted')
  get compacted() {
    return this.stateValue === NgaSidebarComponent.STATE_COMPACTED;
  }

  @Input()
  set right(val: boolean) {
    this.rightValue = convertToBoolProperty(val);
  }
  @Input()
  set left(val: boolean) {
    this.leftValue = convertToBoolProperty(val);
  }
  @Input()
  set fixed(val: boolean) {
    this.fixedValue = convertToBoolProperty(val);
  }
  @Input()
  set state(val: string) {
    this.stateValue = val;
  }

  collapse(): void {
    this.state = NgaSidebarComponent.STATE_COLLAPSED;
  }

  expand(): void {
    this.state = NgaSidebarComponent.STATE_EXPANDED;
  }

  compact(): void {
    this.state = NgaSidebarComponent.STATE_COMPACTED;
  }

  toggle(compact: boolean = false): void {
    const closedStates = [NgaSidebarComponent.STATE_COMPACTED, NgaSidebarComponent.STATE_COLLAPSED];
    if (compact) {
      this.state = closedStates.indexOf(this.stateValue) >= 0 ? NgaSidebarComponent.STATE_EXPANDED : NgaSidebarComponent.STATE_COMPACTED;
    } else {
      this.state = closedStates.indexOf(this.stateValue) >= 0 ? NgaSidebarComponent.STATE_EXPANDED : NgaSidebarComponent.STATE_COLLAPSED;
    }
  }
}
