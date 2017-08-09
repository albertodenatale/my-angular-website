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
                        navigationBarId: MAINNAV,
                        children: [
                            <Skill>{
                                id: "javascript",
                                children: [
                                    <Skill>{
                                        id: "jquery",
                                        navigationBarId: SUBNAV
                                    },
                                    <Skill>{
                                        id: "angularjs",
                                        navigationBarId: SUBNAV
                                    }
                                ]
                            },
                            <Skill>{
                                id: "typescript",
                                children: [
                                    <Skill>{
                                        id: "angular",
                                        navigationBarId: SUBNAV
                                    }
                                ]
                            }
                        ]

                    },
                    <Skill>{
                        id: "backend",
                        navigationBarId: MAINNAV,
                        children: [
                            <Skill>{
                                id: "csharp",
                                navigationBarId: SUBNAV
                            },
                            <Skill>{
                                id: "java",
                                navigationBarId: SUBNAV
                            },
                            <Skill>{
                                id: "cplusplus",
                                navigationBarId: SUBNAV
                            }
                        ]
                    }
                ]
            }
        }
    }
}