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
          this.clippy.speak("Welcome, the buttons are for you to look how comfortable I am with the skills I specialise. Otherwise, double click on me and I will entertain you.", true);
        }
      });
      
      this.store.select<AppState>(state => state).subscribe(
        state => {
  
          if(state.clippy){
            switch(state.clippy.skillId){
              case "angular5": clippy.speak("Angular 7 eh? Very recent framework ... This website is written with angular 5 and I worked on an entire new project using it", false); break;
              case "jquery": clippy.speak("I love jQuery, I received training via Pluralsight on it and since then I have always had some project where I had to use it", false); break;
              case "angularjs": clippy.speak("I was an angular early adopter and I wrote my previous web site with it. I also used for some projects while working at Mosaic and at Brightserver.", false); break;
              case "css": clippy.speak("I spent one year working on CSS projects while at Pharmiweb Solutions. Not one of my favourite, nevertheless I can get things done.", false); break;
              case "wpf": clippy.speak("I have been working with WPF while I was at Mosaic. I managed to fix a serious performance issue and did some ordinary maintenance.", false); break;
              case "wcf": clippy.speak("WCF, definetely very powerful. I have used it while at Mosaic and I recently created a webservice using it.", false); break;
              case "webapi": clippy.speak("My favourite framework together with MVC. I love the simplicity of the design. I have used it in nearly all my roles.", false); break;
              case "mvc": clippy.speak("My favourite framework together with Web API. I love the simplicity of the design. I have used it in nearly all my roles.", false); break;
              case "tsql": clippy.speak("I followed different Pluralsight courses on TSQL and SQL Server. I also had to work on some nasty stored procedure and export an entire CMS. I have some experience also with text search.", false); break;
              case "ef": clippy.speak("I love entity framework, expecially code first, but I can work confidently with edmx too", false); break;
              case "azure": clippy.speak("I had the opportunity to work with it in my work at Creditplus. I also have been hosting my personal website for a while on an Azure virtual machine. I loved how powerful it is and how simple is to create a website.", false); break;
              case "nhibernate": clippy.speak("I worked with both the Java and c# versions of this powerful framework.", false); break;
            }
          }
        }
      );

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
