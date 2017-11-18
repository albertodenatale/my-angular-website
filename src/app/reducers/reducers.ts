import { Main } from './../shared/skilltree';
import { Experience } from './../experiences/experience';
import { ISkillTree, findSkill, Skill, enumerateSkill, enumerateAncestors } from '../shared/skilltree';
import * as Actions from './actions'

export type SelectedNodes = Array<string[]>

export function navigationReducer(state: ISkillTree = { root: null, isLoaded: false }, action: Actions.All): ISkillTree {
    switch (action.type) {
        case Actions.ADD:
            add(state, action.payload);

            break;
        case Actions.REMOVE:
            remove(state, action.payload);

            break;

        case Actions.INITIALSTATELOADED:
            action.payload.isLoaded = true;
            return action.payload;

    }

    return JSON.parse(JSON.stringify(state));
}

function add(state, nodeId) {
    let skill: Skill = findSkill(state, nodeId);

    if (skill != null) {
        skill.isActive = true;

        addAncestors(state, skill);
    }
}
 
function addAncestors(state: ISkillTree, skill: Skill) {
    for(let ancestor of Array.from(enumerateAncestors(state, skill))){
        if(!ancestor.isActive){
            ancestor.isActive = true;
        }
    }
}

function remove(state, nodeId) {
    let skill: Skill = findSkill(state, nodeId);

    if (skill != null) {
        skill.isActive = false;

        for (let s of Array.from(enumerateSkill(skill))) {
            s.isActive = false;
        }
    }
}

export function mainReducer(state: Main = { experiences: [], isLoaded: false }, action: Actions.All): Main {
    switch (action.type) {
        case Actions.MAINCONTENTLOADED:
            action.payload.isLoaded = true;
            return action.payload;
    }

    return JSON.parse(JSON.stringify(state));
}

export function authenticationReducer(state: any, action: Actions.Auth) {
    switch (action.type) {
        case Actions.LOGIN: 
            return action.payload;
        case Actions.LOGOUT: 
            return null;
    }

    return state;
}
