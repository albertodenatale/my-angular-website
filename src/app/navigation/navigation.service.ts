import { Node } from './navigation';
import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

  constructor() { }

  getNavNodes(): Array<Node> {
    return [
      <Node>{
        id: 0,
        key: "frontend",
        label: "Front End"
      },
      <Node>{
        id: 1,
        key: "backend",
        label: "Back End"
      }
    ]
  }

  getSubnavNodes(): Array<Node> {
    return [
      <Node>{
        id: 2,
        label: "angular",
        key: "angular",
        requires: ["frontend"]
      },
      <Node>{
        id: 3,
        label: "AngularJS",
        key: "angularjs",
        requires: ["frontend"]
      },
      <Node>{
        id: 4,
        label: "JQuery",
        key: "angular",
        requires: ["frontend"]
      },
      <Node>{
        id: 5,
        label: "Java",
        key: "java",
        requires: ["backend"]
      },
      <Node>{
        id: 6,
        label: "C#",
        key: "csharp",
        requires: ["backend"]
      },
      <Node>{
        id: 7,
        label: "C++",
        key: "cplusplus",
        requires: ["backend"]
      }
    ]
  }
}

