
export function addSkill(tree: SkillTree, skillId: string) {
    if (tree && tree.root) {

    }
}

export function removeSkill(tree: SkillTree, skillId: string) {
    if (tree && tree.root) {

    }
}

export function findSkill(tree: SkillTree, skillId: string) {
}

export class SkillTree {
    root?: Skill
}

export class Skill {
    id: string
    isActive: boolean
    isVisible:boolean
    navigationBarId:string
    children: Array<Skill>
}