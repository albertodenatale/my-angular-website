import { Main } from './../shared/skilltree';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Experience } from './experience';
import { Injectable } from '@angular/core';
import * as MainActions from '../reducers/actions';
import { map } from 'rxjs/operators'

@Injectable()
export class ExperienceService {
  experiences: AngularFireList<Experience[]>;
  
  constructor(
      private actions$: Actions,
      private db: AngularFireDatabase
    ) { 
      this.experiences = this.db.list<Experience[]>("experiences");
    }

    @Effect() loadInitialState$ = this.actions$
      .pipe(
        ofType(MainActions.FETCHMAINCONTENT),
        map(res => ({type: MainActions.MAINCONTENTLOADED, payload: { isLoaded: true } }))
      );

    updateExperience(experience:Experience, newData:Partial<Experience>){
      this.db.object(`/experiences/${experience.id}`).update(newData);
    }

    addExperience(experience){
      this.db.list("experiences").push(experience);
    }

    deleteExperience(experience){
      this.db.object(`/experiences/${experience.id}`).remove();
    }

}
