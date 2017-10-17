import { ISkillTree, findSkill, Skill, enumerateSkill } from './../shared/skilltree';
import * as NodesActions from './nodes.actions'

export type SelectedNodes = Array<string[]>

export function nodesReducer(state: ISkillTree = {}, action: NodesActions.All): ISkillTree {
    switch (action.type) {
        case NodesActions.ADD:
            add(state, action.payload);

            break;
        case NodesActions.REMOVE:
            remove(state, action.payload);

            break;

        case NodesActions.INITIALSTATELOADED:
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
