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
  whenOn: EventEmitter<any> = new EventEmitter<any>();
  
  @Output()
  whenOff: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('class.btn-primary') isOn: boolean;
  
  @HostBinding('class.btn-info') get isOff() { return !this.isOn;};

  @HostListener('click') toggle() {
    this.isOn = !this.isOn;

    if(this.isOn){
      this.whenOn.emit();
    }
    else{
      this.whenOff.emit();
    }
  }

  ngOnInit() {
  }

}
