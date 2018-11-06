import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'line',
  template: `  
  <div class="separator d-none d-md-block row">
    <div class="col-md-3 first">
      <h5><ng-content></ng-content></h5>
    </div>
    <div class="col-md-9 second">
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
