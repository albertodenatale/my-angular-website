import { Observable } from 'rxjs';
import { Skill, SUBNAV, MAINNAV } from './../shared/skilltree';
import { Injectable } from '@angular/core';
import { SkillTree } from "../shared/skilltree";
import { Http } from "@angular/http";
import { Actions, Effect } from '@ngrx/effects';
import * as NodesActions from '../reducers/actions';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators'

@Injectable()
export class StateService {
    skillTree: Observable<SkillTree>;

    constructor(
        private actions$: Actions,
        private db: AngularFireDatabase
      ) { 
        this.skillTree = this.db.object<SkillTree>("skilltree").valueChanges();
      }

    @Effect() loadInitialState$ = this.actions$
      .ofType(NodesActions.FETCHINITIALSTATE)
      .pipe(
        switchMap(payload => this.getState()),
        map(res => ({type: NodesActions.INITIALSTATELOADED, payload: res }))
      );

      private getState(){
          return this.skillTree;
      }
}
