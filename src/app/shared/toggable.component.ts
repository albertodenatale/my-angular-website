import { Component, OnInit, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'toggable',
  template: `
      <ng-content></ng-content>
  `,
  host: { 'class':'btn' }
})
export class ToggableComponent implements OnInit {
  
  @Output()
  clicked: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('class.btn-primary') isOn: boolean = true;
  
  @HostBinding('class.btn-info') get isOff() { return !this.isOn;};

  @HostListener('click') toggle() {
    this.clicked.emit();
    this.isOn = !this.isOn;
  }

  ngOnInit() {
  }

}
