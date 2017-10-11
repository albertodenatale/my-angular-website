import { Skill, SUBNAV, MAINNAV } from './../shared/skilltree';
import { Injectable } from '@angular/core';
import { SkillTree, ISkillTree } from "app/shared/skilltree";


@Injectable()
export class StateService {

    loadInitialState(): ISkillTree {
        return <SkillTree>{
            root: <Skill>{
                id: null,
                children: [
                    <Skill>{
                        id: "frontend",
                        label:"Front End",
                        navigationBarId: MAINNAV,
                        children: [
                            <Skill>{
                                id: "javascript",
                                label:"Javascript",
                                children: [
                                    <Skill>{
                                        id: "jquery",
                                        label:"jquery",
                                        navigationBarId: SUBNAV,
                                        parentId: "javascript"
                                    },
                                    <Skill>{
                                        id: "angularjs",
                                        label:"angularjs",
                                        navigationBarId: SUBNAV,
                                        parentId: "javascript"
                                    }
                                ],
                                navigationBarId: SUBNAV,
                                parentId: "frontend"
                            },
                            <Skill>{
                                id: "typescript",
                                label:"Typescript",
                                children: [
                                    <Skill>{
                                        id: "angular",
                                        label:"Angular",
                                        navigationBarId: SUBNAV,
                                        parentId: "typescript"
                                    }
                                ],
                                navigationBarId: SUBNAV,
                                parentId: "frontend"
                            }
                        ]

                    },
                    <Skill>{
                        id: "backend",
                        label:"Back End",
                        navigationBarId: MAINNAV,
                        children: [
                            <Skill>{
                                id: "csharp",
                                label:"C#",
                                navigationBarId: SUBNAV,
                                parentId: "backend"
                            },
                            <Skill>{
                                id: "java",
                                label:"Java",
                                navigationBarId: SUBNAV,
                                parentId: "backend"
                            },
                            <Skill>{
                                id: "cplusplus",
                                label:"C++",
                                navigationBarId: SUBNAV,
                                parentId: "backend"
                            }
                        ]
                    }
                ]
            }
        }
    }
}