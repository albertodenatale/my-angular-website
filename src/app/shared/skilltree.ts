import { element } from 'protractor';
import { ISkillTree } from './skilltree';
import * as Immutable from 'immutable';

export function addSkill(tree: ISkillTree, skillId: string) {
    if (tree && tree.root) {

    }
}

export function removeSkill(tree: ISkillTree, skillId: string) {
    if (tree && tree.root) {

    }
}

export function findSkill(tree: ISkillTree, skillId: string): Skill {
    for (var skill of Array.from(enumerateTree(tree))) {
        if (skill.id === skillId) {
            return skill;
        }
    }
}

export function getByNavigationBarId(tree: ISkillTree, navBarId: string): Array<Skill> {
    let result: Array<Skill> = [];

    for (var skill of Array.from(enumerateTree(tree))) {
        if (skill.navigationBarId === navBarId) {
            result.push(skill);
        }
    }

    return result;
}

export function* enumerateTree(tree: ISkillTree): IterableIterator<Skill> {
    if (tree == null || tree.root == null) {
        return;
    }
    
    for (let skill of Array.from(enumerateSkill(tree.root))) {
        yield skill;
    }
}

export function* enumerateSkill(skill: Skill): IterableIterator<Skill> {
    if (skill.children == null || skill.children.length === 0) {
        return;
    }
    else {
        for (let child of skill.children) {
            for (let nephew of Array.from(enumerateSkill(child))) {
                yield nephew;
            }

            yield child;
        }
    }
}


export class AppState {
    skillTree: ISkillTree;
}

export interface ISkillTree {
    root?: Skill
}

export class SkillTree implements ISkillTree {
    root?: Skill

    private currentNode: Skill = this.root;
}

export class Skill {
    id: string;
    isActive: boolean;
    isVisible: boolean;
    navigationBarId: string;
    children: Array<Skill>;
    parentId: string;
    label:string;
}

export const MAINNAV = "MAINNAV";
export const SUBNAV = "SUBNAV";