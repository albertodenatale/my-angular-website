import { Observable } from 'rxjs/Rx';
import { Skill, SUBNAV, MAINNAV } from './../shared/skilltree';
import { Injectable, state } from '@angular/core';
import { SkillTree, ISkillTree } from "app/shared/skilltree";
import { Http } from "@angular/http";
import { Actions, Effect } from '@ngrx/effects';
import * as NodesActions from 'app/reducers/nodes.actions';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class StateService {
    state: Observable<SkillTree[]>;

    constructor(
        private http: Http,
        private actions$: Actions,
        private db: AngularFireDatabase
      ) { 
        this.state = this.db.object<SkillTree>("skilltree").valueChanges();
      }

      @Effect() loadInitialState$ = this.actions$
        .ofType(NodesActions.FETCHINITIALSTATE)
        .switchMap(payload => this.getState())
        .map(res => ({type: NodesActions.INITIALSTATELOADED, payload: res }))

        private getState(){
            return this.state;
        }
        
    // loadInitialState(): ISkillTree {
    //     return <SkillTree>{
    //         root: <Skill>{
    //             id: null,
    //             children: [
    //                 <Skill>{
    //                     id: "webdev",
    //                     children: [
    //                         <Skill>{
    //                             id: "frontend",
    //                             label: "Front End",
    //                             navigationBarId: MAINNAV,
    //                             children: [
    //                                 <Skill>{
    //                                     id: "js",
    //                                     label: "Javascript",
    //                                     children: [
    //                                         <Skill>{
    //                                             id: "jquery",
    //                                             label: "jquery",
    //                                             navigationBarId: SUBNAV,
    //                                             parentId: "js"
    //                                         },
    //                                         <Skill>{
    //                                             id: "angularjs",
    //                                             label: "angularjs",
    //                                             navigationBarId: SUBNAV,
    //                                             parentId: "js"
    //                                         }
    //                                     ],
    //                                     navigationBarId: SUBNAV,
    //                                     parentId: "frontend"
    //                                 },
    //                                 <Skill>{
    //                                     id: "typescript",
    //                                     label: "Typescript",
    //                                     children: [
    //                                         <Skill>{
    //                                             id: "angular",
    //                                             label: "Angular",
    //                                             navigationBarId: SUBNAV,
    //                                             parentId: "typescript"
    //                                         }
    //                                     ],
    //                                     navigationBarId: SUBNAV,
    //                                     parentId: "frontend"
    //                                 }
    //                             ]

    //                         },
    //                         <Skill>{
    //                             id: "backend",
    //                             label: "Back End",
    //                             navigationBarId: MAINNAV,
    //                             children: [
    //                                 <Skill>{
    //                                     id: "csharp",
    //                                     label: "C#",
    //                                     navigationBarId: SUBNAV,
    //                                     parentId: "backend"
    //                                 },
    //                                 <Skill>{
    //                                     id: "java",
    //                                     label: "Java",
    //                                     navigationBarId: SUBNAV,
    //                                     parentId: "backend"
    //                                 },
    //                                 <Skill>{
    //                                     id: "cplusplus",
    //                                     label: "C++",
    //                                     navigationBarId: SUBNAV,
    //                                     parentId: "backend"
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 <Skill> {
    //                     id:"versioncontrol",
    //                     children:[
    //                         <Skill>{
    //                             id: "git",
    //                             label: "Git",
    //                         },
    //                         <Skill>{
    //                             id: "subversion",
    //                             label: "subversion",
    //                         },
    //                         <Skill>{
    //                             id: "tfs",
    //                             label: "tfs",
    //                         },
    //                     ]
    //                 }
    //             ]
    //         }
    //     }
    // }
}
