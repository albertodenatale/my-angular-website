import { Main } from './../shared/skilltree';
import { Action } from '@ngrx/store';
import { ISkillTree } from "app/shared/skilltree";

export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const INITIALSTATELOADED = "INITIALSTATELOADED";
export const MAINCONTENTLOADED = "MAINCONTENTLOADED";
export const FETCHMAINCONTENT = "FETCHMAINCONTENT";
export const FETCHINITIALSTATE = "FETCHINITIALSTATE";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: string) { }
}

export class FetchInitialState implements Action {
    readonly type = FETCHINITIALSTATE;
}

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public payload: string) { }
}

export class InitialStateLoaded implements Action {
    readonly type = INITIALSTATELOADED;

    constructor(public payload: ISkillTree) { }
}

export class FetchMainContent implements Action {
    readonly type = FETCHMAINCONTENT;
}

export class MainContentLoaded implements Action {
    readonly type = MAINCONTENTLOADED;

    constructor(public payload: Main) { }
}

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: any) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;

    constructor(public payload: any) { }
}

export type All =  Add | Remove| InitialStateLoaded | FetchInitialState | MainContentLoaded | FetchMainContent;
export type Auth =  Login | Logout;