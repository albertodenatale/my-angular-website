import { Observable } from 'rxjs/Rx';
import { SkillTree } from './shared/skilltree';
import * as NodesActions from 'app/reducers/nodes.actions';
import { StateService } from './core/state.service';
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger("loaded",
      [
        state("loaded", style({ transform: "translate(0)" })),
        transition('loading => loaded', [
          animate(300, keyframes([
            style({ transform: 'translateX(-100%)', }),
            style({ transform: 'translateX(30px)' }),
            style({ transform: 'translateX(0)' })
          ]))
        ])
      ])
  ]
})
export class AppComponent {
  loaded: string = "loading";

  constructor(private store: Store<SkillTree>, private stateService: StateService) {
    this.store.select<SkillTree>((state) => state).toPromise().then(() => { this.loaded = "loaded" });
  }

  ngOnInit() {
    this.store.dispatch({
      type: NodesActions.INITIALSTATELOADED,
      payload: this.stateService.loadInitialState()
    });

    //TimerObservable.create(1000).subscribe(_ => this.loaded="loaded")
  }
}
