import { ISkillTree, findSkill, Skill, updateSkill } from './../shared/skilltree';
import * as NodesActions from './nodes.actions'

export type SelectedNodes = Array<string[]>

export function nodesReducer(state: ISkillTree = {}, action: NodesActions.All): ISkillTree {
    switch (action.type) {
        case NodesActions.ADD:
            // 1. check if the path exists
            let nodeId = action.payload;
            let skill : Skill = findSkill(state, nodeId);

            if(skill != null){
                skill.isActive = true;
                skill.isVisible = true;

                state = updateSkill(state, skill);

                // 2. add every node on the path that has not been added yet
                let currentSkill = skill;

                while(currentSkill.parent != null){
                    currentSkill.parent.isActive = true;
                    currentSkill.parent.isVisible = true;

                    currentSkill = skill.parent;

                    state = updateSkill(state, currentSkill);
                }
            }

            break;
        case NodesActions.REMOVE:
            // 1. check if the path exists
            // 2. check if the parent has any active child
            break;

        case NodesActions.INITIALSTATELOADED:
            return action.payload;

    }

    return state;
}
