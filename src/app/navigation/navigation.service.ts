import { Node } from './navigation';
import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

  constructor() { }

  getNavNodes() : Array<Node>{
    return [
      <Node> {
        id:0,
        key:"frontend",
        label:"Front End"
      }, 
      <Node> {
        id:1,
        key:"backend",
        label:"Back End"
      }
    ]
  }

  getSubnavNodes():{ [key:string]:Array<Node> }{
    return {
      frontend:[
        <Node>{
          id:2,
          label:"angular",
          key:"angular"
        },
        <Node>{
          id:3,
          label:"AngularJS",
          key:"angularjs"
        },
        <Node>{
          id:4,
          label:"JQuery",
          key:"angular"
        }
      ],
      backend:[
        <Node>{
          id:5,
          label:"Java",
          key:"java"
        },
        <Node>{
          id:6,
          label:"C#",
          key:"csharp"
        },
        <Node>{
          id:7,
          label:"C++",
          key:"cplusplus"
        }
      ]
    }
  }
}
