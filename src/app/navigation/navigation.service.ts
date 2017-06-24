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
        label: "Front End",
        path: ["frontend"]
      },
      <Node>{
        id: 1,
        key: "backend",
        label: "Back End",
        path: ["backend"]
      }
    ]
  }

  getSubnavNodes(): Array<Node> {
    return [
      <Node>{
        id: 2,
        label: "javascript",
        key: "javascript",
        path: ["frontend", "javascript"]
      },
      <Node>{
        id: 2,
        label: "typescript",
        key: "typescript",
        path: ["frontend", "typescript"]
      },
      <Node>{
        id: 2,
        label: "angular",
        key: "angular",
        path: ["frontend", "typescript", "angular"]
      },
      <Node>{
        id: 3,
        label: "AngularJS",
        key: "angularjs",
        path: ["frontend", "javascript","angularjs"]
      },
      <Node>{
        id: 4,
        label: "JQuery",
        key: "jquery",
        path: ["frontend", "javascript","jquery"]
      },
      <Node>{
        id: 5,
        label: "Java",
        key: "java",
        path: ["backend","java"]
      },
      <Node>{
        id: 6,
        label: "C#",
        key: "csharp",
        path: ["backend","csharp"]
      },
      <Node>{
        id: 7,
        label: "C++",
        key: "cplusplus",
        path: ["backend","cplusplus"]
      }
    ]
  }
}

