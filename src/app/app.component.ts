import { ClippyService } from 'js-clippy';
import { Subscription } from 'rxjs';
import { LoadingService } from './loading/loading.service';
import { Login } from './reducers/actions';
import { ISkillTree, AppState } from './shared/skilltree';
import * as NodesActions from './reducers/actions';
import { Component } from '@angular/core';
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
    private firebaseAuth: AngularFireAuth,
    private loadingService:LoadingService,
    private clippy: ClippyService
  ) {
    this.loadingNavSubscription = this.store.select<ISkillTree>(state => state.navigation).subscribe(
      skillTree => {
        if (skillTree.isLoaded) {
          this.loadingNavSubscription.unsubscribe();
          this.loadingService.navigationLoaded();
          this.clippy.speak("Welcome, the buttons are for you to look how comfortable I am with the skills I specialise", true);
        }
      });

      this.clippy.create("Clippy");
    ;
   }

  ngOnInit() {
    this.store.dispatch({
      type: NodesActions.FETCHINITIALSTATE
    });

    this.clippy.show(true);
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
