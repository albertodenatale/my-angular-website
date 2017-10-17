import { Action } from '@ngrx/store';
import { ISkillTree } from "app/shared/skilltree";

export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const INITIALSTATELOADED = "INITIALSTATELOADED";

export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: string) { }
}

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { }
}

export class InitialStateLoaded implements Action {
    readonly type = INITIALSTATELOADED;

    constructor(public payload: ISkillTree) { }
}

export type All =  Add | Remove| InitialStateLoaded;