import { ToggableService } from 'app/core/toggable.service';
import { Action } from 'app/core/tags';
import { Component, OnInit, Output, EventEmitter, HostBinding, HostListener, Input, Directive } from '@angular/core';
import { TagService } from "app/core/tag.service";

@Directive({
  selector: 'toggable, [toggable]',
  host: { 'class':'btn' }
})
export class ToggableDirective{
  @Input()
  id:string;
  
  @Output()
  whenOn: EventEmitter<ToggableDirective> = new EventEmitter<ToggableDirective>();
  
  @Output()
  whenOff: EventEmitter<ToggableDirective> = new EventEmitter<ToggableDirective>();

  @Input()
  @HostBinding('class.btn-primary') isOn: boolean;
  
  @HostBinding('class.btn-info') get isOff() { return !this.isOn;};

  toggleState(){
    this.isOn = !this.isOn;
  }

  @HostListener('click') toggle() {
    this.isOn = !this.isOn;

    if(this.isOn){
      this.whenOn.emit(this);
    }
    else{
      this.whenOff.emit(this);
    }
  }

}
