import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { ISkillTree, AppState } from './shared/skilltree';
import * as NodesActions from 'app/reducers/actions';
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

  constructor(private store: Store<AppState>, private stateService: StateService) {
    this.store.select<ISkillTree>(state => state.navigation).subscribe((skillTree) => { if(skillTree.isLoaded) { this.loaded = "loaded"} });
  }

  ngOnInit() {
    this.store.dispatch({
      type: NodesActions.FETCHINITIALSTATE
    });
  }
}
