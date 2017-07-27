import { SkillTree } from './../shared/skilltree';
import * as NodesActions from './nodes.actions'

export type SelectedNodes = Array<string[]>

export function nodesReducer(state: SkillTree = {}, action: NodesActions.All): SkillTree {
    switch (action.type) {
        case NodesActions.ADD:
            // 1. check if the path exists
            // 2. add every node on the path that has not been added yet
            break;
        case NodesActions.REMOVE:
            // 1. check if the path exists
            // 2. check if the parent has any active child
            break;

        case NodesActions.INITIALSTATELOADED:
            return action.payload;

        default: return state;
    }
}
