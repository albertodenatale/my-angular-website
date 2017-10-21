import { Observable } from 'rxjs/Rx';
import { Skill, SUBNAV, MAINNAV } from './../shared/skilltree';
import { Injectable, state } from '@angular/core';
import { SkillTree, ISkillTree } from "app/shared/skilltree";
import { Http } from "@angular/http";
import { Actions, Effect } from '@ngrx/effects';
import * as NodesActions from 'app/reducers/actions';
import { AngularFireDatabase } from 'angularfire2/database';

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
        .switchMap(payload => this.getState())
        .map(res => ({type: NodesActions.INITIALSTATELOADED, payload: res }))

        private getState(){
            return this.skillTree;
        }
        
}
