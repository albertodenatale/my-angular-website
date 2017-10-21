import { ExperienceService } from './experiences/experience.service';
import { StateService } from './core/state.service';
import { CoreModule } from './core/core.module';
import { NavigationModule } from './navigation/navigation.module';
import { ExperiencesModule } from './experiences/experiences.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from "@ngrx/store";
import { navigationReducer, mainReducer} from "app/reducers/reducers";
import { environment } from "environments/environment";
import { AngularFireModule } from 'angularfire2';
import { EffectsModule } from "@ngrx/effects";
import { AngularFireDatabaseModule } from "angularfire2/database";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ExperiencesModule,
    NavigationModule,
    CoreModule,
    StoreModule.forRoot({ navigation: navigationReducer, main: mainReducer }),
    AngularFireModule.initializeApp(environment.firebase),             
    AngularFireDatabaseModule,   
    EffectsModule.forRoot([StateService, ExperienceService])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
