import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'search',
  template: `
      <!--<button class="btn btn-primary pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i></button> -->
      <toggable>FrontEnd</toggable>
      <toggable>BackEnd</toggable>
     <!--< <div class="input-group">
        <input type="text" name="search" class="form-control" placeholder="keywords">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </span>
      </div>-->`
})
export class SearchComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
