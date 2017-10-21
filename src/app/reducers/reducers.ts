import { Main } from './../shared/skilltree';
import { Experience } from './../experiences/experience';
import { ISkillTree, findSkill, Skill, enumerateSkill } from '../shared/skilltree';
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
