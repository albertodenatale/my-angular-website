import { ClippyService } from 'js-clippy';
import { Subscription } from 'rxjs';
import { LoadingService } from './loading/loading.service';
import { ISkillTree, AppState } from './shared/skilltree';
import * as NodesActions from './reducers/actions';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Store } from "@ngrx/store";
import { DarkModeService } from './darkmode/darkmode.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  user: any
  isNavShowed: boolean = true;
  loadingNavSubscription: Subscription;
  isDarkModeOn: Boolean;

  constructor(private store: Store<AppState>,
    private loadingService: LoadingService,
    private clippy: ClippyService,
    private darkModeService: DarkModeService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
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

        if (state.clippy) {
          switch (state.clippy.skillId) {
            case "angular5": clippy.speak("Angular 9 eh? That's quite a modern framework ... This website was written with angular 5 and was updated first to Angular 7 and then to Angular 9", false); break;
            case "jquery": clippy.speak("I love jQuery, I received training via Pluralsight on it and since then I have always had some project where I had to use it", false); break;
            case "angularjs": clippy.speak("I was an AngularJS early adopter and I wrote my previous web site with it. I also used it for some projects while working at Mosaic, Brightserver and Avanade.", false); break;
            case "css": clippy.speak("I spent one year working on CSS projects while at Pharmiweb Solutions. Not one of my favourite, nevertheless I can get things done.", false); break;
            case "wpf": clippy.speak("I have been working with WPF while I was at Mosaic and Avanade. My most recent contribution was on an app for a huge bank and trading in the Forex market.", false); break;
            case "wcf": clippy.speak("WCF, definetely very powerful. I have used it while at Mosaic, Creditplus and Avanade. However, Swagger might be a more modern option.", false); break;
            case "webapi": clippy.speak("My favourite framework together with MVC. I love the simplicity of the design. I have used it in nearly all my roles.", false); break;
            case "mvc": clippy.speak("My favourite framework together with Web API. I love the simplicity of the design. I have used it in nearly all my roles.", false); break;
            case "tsql": clippy.speak("I followed different Pluralsight courses on TSQL and SQL Server. I also had to work on some nasty stored procedure and export an entire CMS. I have some experience also with text search.", false); break;
            case "ef": clippy.speak("I love entity framework, expecially code first, but I can work confidently with .edmx too", false); break;
            case "azure": clippy.speak("I had the opportunity to work with it while at Creditplus and Avanade. I am an open source contributor for the Azure SDK on GitHub.", false); break;
            case "nhibernate": clippy.speak("I worked with both the Java and c# versions of this powerful framework.", false); break;
          }
        }
      }
    );

    this.clippy.create("Clippy");

    this.darkModeService.darkModeOnOrOff$.subscribe((isDarkModeOn) => {
      if(isDarkModeOn){
        this.renderer.addClass(this.document.body, 'darkModeOn');
      } else {
        this.renderer.removeClass(this.document.body, 'darkModeOn');
      }
    });
  }

  ngOnInit() {
    this.store.dispatch({
      type: NodesActions.FETCHINITIALSTATE
    });

    try {
      this.clippy.show(false);
    }
    catch (e) {

    }
  }
}
