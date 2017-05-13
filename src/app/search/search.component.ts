import { Component, OnInit, trigger, state, style, transition, animate  } from '@angular/core';
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'search',
  template:`
    <div class="venus" [@loaded]="loaded">
      <!--<button class="btn btn-primary pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i></button> -->
      <toggable>C#</toggable>
      <toggable>.NET</toggable>
      <toggable>Angular</toggable>
      <toggable>MVC</toggable>
      <toggable>C#</toggable>
      <toggable>.NET</toggable>
      <toggable>Angular</toggable>
      <toggable>MVC</toggable>
     <!--< <div class="input-group">
        <input type="text" name="search" class="form-control" placeholder="keywords">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </span>
      </div>-->
    </div>`,
  animations: [
    trigger("loaded",
      [
        state("loading", style({ transform: "translate(400px)" })),
        state("loaded", style({ transform: "translate(0)" })),
        transition('loading => loaded', animate('300ms ease-in'))
      ])
  ]
})
export class SearchComponent implements OnInit {

  loaded: string = "loading";

  constructor() { }

  ngOnInit() {
    TimerObservable.create(2000).subscribe(_ => this.loaded="loaded")
  }

}
