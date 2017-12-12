import { Main } from './../shared/skilltree';
import { Observable } from 'rxjs/Rx';
import { SkillTree } from 'app/shared/skilltree';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Effect, Actions } from '@ngrx/effects';
import { Experience } from './experience';
import { Injectable } from '@angular/core';
import { Node } from '../navigation/navigation';
import * as MainActions from 'app/reducers/actions';

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
      .ofType(MainActions.FETCHMAINCONTENT)
      .map(res => ({type: MainActions.MAINCONTENTLOADED, payload: { isLoaded: true } }));

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
