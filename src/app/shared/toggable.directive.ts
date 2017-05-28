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

  @Input()
  @HostBinding('class.btn-primary') isOn: boolean;
  
  @HostBinding('class.btn-info') get isOff() { return !this.isOn;};

  toggleState(){
    this.isOn = !this.isOn;
  }

}
