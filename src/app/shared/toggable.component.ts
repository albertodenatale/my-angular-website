import { ToggableService } from 'app/core/toggable.service';
import { Action } from 'app/core/tags';
import { Component, OnInit, Output, EventEmitter, HostBinding, HostListener, Input } from '@angular/core';
import { TagService } from "app/core/tag.service";

@Component({
  selector: 'toggable',
  template: `
      <ng-content></ng-content>
  `,
  host: { 'class':'btn' }
})
export class ToggableComponent implements OnInit {
  @Input()
  id:string;
  
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

  constructor(private toggableService:ToggableService){ }

  ngOnInit() {
    this.toggableService.toggables.subscribe(t =>{
      if(t.id == this.id){
        this.isOn=t.action!=Action.Remove;
      }
    })
  }

}
