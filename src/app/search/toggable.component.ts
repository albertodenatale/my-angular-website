import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'toggable',
  template: `
    <button class="btn" [ngClass]="{ 'btn-primary': isOn, 'btn-info':!isOn }" (click)="toggle()">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display:block;
      width: 10%;
      min-width: 100px;
      float:right;
      margin: 0 0% 1% 1%;
      .btn{
          width: 100%;
          &.btn-primary{
              background-color:$blueDark;
          } 
          &.btn-secondary{
              background-color:$blueMedium;
          } 
      }
    }`]
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
