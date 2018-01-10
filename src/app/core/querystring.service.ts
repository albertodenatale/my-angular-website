import { Store } from '@ngrx/store';
import { QueryStringLoaded } from '../reducers/actions';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Effect, Actions } from "@ngrx/effects";
import * as MainActions from 'app/reducers/actions';
import { AppState, ISkillTree } from "app/shared/skilltree";

@Injectable()
export class QueryStringService {

  constructor(
    private actions$: Actions,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private store: Store<AppState>
  ) {
    // this.store.select<ISkillTree>(state => state.navigation).subscribe(
    //   skillTree => {
    //     if(skillTree.queryString && Object.keys(skillTree.queryString).length > 0){
    //       this.router.navigate([''], { queryParams: skillTree.queryString, relativeTo:this.activatedRoute });
    //     }
    //   }
    // );
  }

  @Effect() loadInitialState$ = this.actions$
    .ofType(MainActions.FETCHMAINCONTENT)
    .switchMap(payload => this.getQueryString())
    .map(query => {
      if (this.isEmpty(query)) {
        return new QueryStringLoaded({ frontend: '', backend: '' });
      }
      else {
        return new QueryStringLoaded(query);
      }
    });

  private isEmpty(queryString): boolean {
    return queryString == null || Object.keys(queryString).length === 0;
  }

  getQueryString() {
    return this.activatedRoute.queryParams;
  }

}
