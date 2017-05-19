import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger("loaded",
      [
        state("loaded", style({ transform: "translate(0)" })),
        transition('loading => loaded', [
        animate(300, keyframes([
          style({ transform: 'translateX(-100%)',}),
          style({ transform: 'translateX(30px)' }),
          style({ transform: 'translateX(0)' })
        ]))
      ])
      ])
  ]
})
export class AppComponent {
  loaded: string = "loading";

  ngOnInit() {
    TimerObservable.create(1000).subscribe(_ => this.loaded="loaded")
  }
}
