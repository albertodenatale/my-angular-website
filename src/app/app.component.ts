import { Login } from './reducers/actions';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { ISkillTree, AppState } from './shared/skilltree';
import * as NodesActions from 'app/reducers/actions';
import { StateService } from './core/state.service';
import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Store } from "@ngrx/store";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

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
  user:any

  constructor(private store: Store<AppState>, private stateService: StateService, private firebaseAuth: AngularFireAuth) {
    this.store.select<ISkillTree>(state => state.navigation).subscribe((skillTree) => { if (skillTree.isLoaded) { this.loaded = "loaded" } });
  }

  ngOnInit() {
    this.store.dispatch({
      type: NodesActions.FETCHINITIALSTATE
    });
  }

 googleauth() {
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (value) =>{
        if(value){
          this.store.dispatch(
            new Login(value)
          )
        }
      }
    ).catch((error) => {
      // TODO display error
    });
  }
}
