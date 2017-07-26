import * as NodesActions from './nodes.actions'

export type NodesActions = NodesActions.All;

export type SelectedPaths = Array<string[]>

export function nodesReducer(state: SelectedPaths, action: NodesActions): SelectedPaths {
    switch (action.type) {
        case NodesActions.ADD: break;
        case NodesActions.REMOVE: break;
        default: return state;
    }
}