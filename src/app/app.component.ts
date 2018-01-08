import { QueryStringService } from './core/querystring.service';
import { Login } from './reducers/actions';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { ISkillTree, AppState } from './shared/skilltree';
import * as NodesActions from 'app/reducers/actions';
import { StateService } from './core/state.service';
import { Component } from '@angular/core';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Store } from "@ngrx/store";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { style, trigger, state, transition, animate, keyframes, query, stagger } from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger("loaded",
      [
        transition('* => *', [
          query(':enter', style({ opacity: 0 }), { optional: true }),
          query(':enter',
            stagger('200ms', [
              animate(300,
                keyframes([
                  style({ transform: 'translateX(-100%)', opacity: 0 }),
                  style({ transform: 'translateX(30px)', opacity: 1 }),
                  style({ transform: 'translateX(0)' })
                ])
              )
            ]), { optional: true }
          )
        ])
      ])
  ]
})
export class AppComponent {
  loaded: string = "loading";
  user: any

  constructor(private store: Store<AppState>, private stateService: StateService, private firebaseAuth: AngularFireAuth, private queryStringComponent:QueryStringService) {
    this.store.select<ISkillTree>(state => state.navigation).subscribe((skillTree) => { if (skillTree.isLoaded) { this.loaded = "loaded" } });
  }

  ngOnInit() {
    this.store.dispatch({
      type: NodesActions.FETCHINITIALSTATE
    });
  }

  googleauth() {
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (value) => {
        if (value) {
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
