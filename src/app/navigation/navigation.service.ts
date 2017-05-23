import { Experience } from './../experiences/experience';
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
        label: "javascript",
        key: "javascript",
        path: ["frontend"]
      },
      <Node>{
        id: 3,
        label: "CSS3",
        key: "css",
        path: ["frontend"]
      },
      <Node>{
        id: 4,
        label: "HTML5",
        key: "html",
        path: ["frontend"]
      },
      <Node>{
        id: 5,
        label: "Java",
        key: "java",
        path: ["backend"]
      },
      <Node>{
        id: 6,
        label: "C#",
        key: "csharp",
        path: ["backend"]
      },
      <Node>{
        id: 7,
        label: "C++",
        key: "cplusplus",
        path: ["backend"]
      }
    ]
  }

  getExperienceSubnav(experience:Experience): Array<Node>  {
    return [
      <Node>{
        id: 2,
        label: "angular",
        key: "angular",
        path: ["frontend", "javascript"]
      },
      <Node>{
        id: 3,
        label: "AngularJS",
        key: "angularjs",
        path: ["frontend", "javascript"]
      },
      <Node>{
        id: 4,
        label: "JQuery",
        key: "jquery",
        path: ["frontend", "javascript"]
      },
      <Node>{
        id: 5,
        label: "Java",
        key: "java",
        path: ["backend"]
      },
      <Node>{
        id: 6,
        label: "C#",
        key: "csharp",
        path: ["backend"]
      },
      <Node>{
        id: 7,
        label: "C++",
        key: "cplusplus",
        path: ["backend"]
      }
    ]
  }
}

