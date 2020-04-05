import { Observable } from 'rxjs';
import { Skill, SUBNAV, MAINNAV } from './../shared/skilltree';
import { Injectable } from '@angular/core';
import { SkillTree } from "../shared/skilltree";
import { Actions, Effect, ofType } from '@ngrx/effects';
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
    .pipe(
      ofType(NodesActions.FETCHINITIALSTATE),
      switchMap(payload => this.getState()),
      map(res => this.createState(res))
    );

  private getState() {
    return this.skillTree;
  }

  private createState(tree: SkillTree) {
    return { type: NodesActions.INITIALSTATELOADED, payload: tree };
  }
}
