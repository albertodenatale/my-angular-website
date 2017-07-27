import { Skill } from './../shared/skilltree';
import { Injectable } from '@angular/core';
import { SkillTree } from "app/shared/skilltree";


@Injectable()
export class StateService {

    loadInitialState(): SkillTree {
        return <SkillTree>{
            root: <Skill>{
                id: null,
                children: [
                    <Skill>{
                        id: "frontend",
                        children: [
                            <Skill>{
                                id: "javascript",
                                children: [
                                    <Skill>{
                                        id: "jquery"
                                    },
                                    <Skill>{
                                        id: "angularjs"
                                    }
                                ]
                            },
                            <Skill>{
                                id: "typescript",
                                children: [
                                    <Skill>{
                                        id: "angular"
                                    }
                                ]
                            }
                        ]

                    },
                    <Skill>{
                        id: "backend",
                        children: [
                            <Skill>{
                                id: "csharp"
                            },
                            <Skill>{
                                id: "java"
                            },
                            <Skill>{
                                id: "cplusplus"
                            }
                        ]
                    }
                ]
            }
        }
    }
}