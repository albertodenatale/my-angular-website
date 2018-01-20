import { QueryStringService } from './core/querystring.service';
import { Login } from './reducers/actions';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { ISkillTree, AppState } from './shared/skilltree';
import * as NodesActions from 'app/reducers/actions';
import { StateService } from './core/state.service';
import { Component, HostBinding } from '@angular/core';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Store } from "@ngrx/store";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user: any
  isNavShowed:boolean = true;
  //@HostBinding('@.disabled') public animationsDisabled = true;

  constructor(private store: Store<AppState>, 
    private stateService: StateService, 
    private firebaseAuth: AngularFireAuth, 
    private queryStringComponent:QueryStringService) {
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
