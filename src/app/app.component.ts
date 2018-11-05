import { Subscription } from 'rxjs';
import { LoadingService } from './loading/loading.service';
import { QueryStringService } from './core/querystring.service';
import { Login } from './reducers/actions';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ISkillTree, AppState } from './shared/skilltree';
import * as NodesActions from './reducers/actions';
import { StateService } from './core/state.service';
import { Component, HostBinding } from '@angular/core';
import { Store } from "@ngrx/store";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user: any
  isNavShowed: boolean = true;
  loadingNavSubscription : Subscription;

  constructor(private store: Store<AppState>,
    private stateService: StateService,
    private firebaseAuth: AngularFireAuth,
    private queryStringComponent: QueryStringService,
    private loadingService:LoadingService
  ) {
    this.loadingNavSubscription = this.store.select<ISkillTree>(state => state.navigation).subscribe(
      skillTree => {
        if (skillTree.isLoaded) {
          this.loadingNavSubscription.unsubscribe();
          this.loadingService.navigationLoaded();
        }
      }
    )
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
