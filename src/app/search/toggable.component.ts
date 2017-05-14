import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'toggable',
  template: `
    <button class="btn" [ngClass]="{ 'btn-primary': isOn, 'btn-info':!isOn }" (click)="toggle()">
      <ng-content></ng-content>
    </button>
  `
})
export class ToggableComponent implements OnInit {

  @Output()
  clicked: EventEmitter<any> = new EventEmitter<any>();

  isOn: boolean = true;

  ngOnInit() {
  }

  toggle() {
    this.clicked.emit();
    this.isOn = !this.isOn;
  }

}
