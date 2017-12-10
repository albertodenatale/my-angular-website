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
      .switchMap(payload => this.getState())
      .map(res => ({type: MainActions.MAINCONTENTLOADED, payload: res }));
      
    private getState(){
        return this.experiences.snapshotChanges()
        .map(snapshots =>{
          return snapshots.map(s =>
            <Experience> {
              id: s.key,
              title: s.payload.val().title,
              place: s.payload.val().place,
              description: s.payload.val().description,
              subnav: s.payload.val().subnav,
              period: s.payload.val().period,
              path: s.payload.val().path,
              label: s.payload.val().label
            }
          )
        })
        .map(e => <Main>{ experiences : e });
    }

    updateExperience(experience:Experience, newData:Partial<Experience>){
      this.db.object(`/experiences/${experience.id}`).update(newData);
    }

}
