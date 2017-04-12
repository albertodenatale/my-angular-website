import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger("loaded",
      [
        state("loading", style({ transform: "translate(400px)" })),
        state("loaded", style({ transform: "translate(0)" })),
        transition('loading => loaded', animate('300ms ease-in'))
      ])
  ]
})
export class AppComponent {
  loaded: string = "loading";

  ngOnInit() {
    TimerObservable.create(2000).subscribe(_ => this.loaded="loaded")
  }
}
