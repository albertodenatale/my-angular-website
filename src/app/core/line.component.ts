import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'line',
  template: `  
  <div class="separator row">
    <div class="col-3 first">
      <h5><ng-content></ng-content></h5>
    </div>
    <div class="col second">
      <div class="line"></div>
      <div class="square"></div>
    </div>
  </div>`
})
export class LineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
