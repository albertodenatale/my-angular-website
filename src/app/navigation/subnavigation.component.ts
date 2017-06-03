import { Subject } from 'rxjs/Subject';
import { Tags } from './../core/tags';
import { Observable } from 'rxjs/Observable';
import { TagService } from './../core/tag.service';
import { Action } from '../core/tags';
import { NavigationService } from './navigation.service';
import { Component, OnInit, trigger, state, transition, style, animate, keyframes, ViewChild } from '@angular/core';
import { Node } from './navigation';
import 'rxjs/Rx';
import { QueueDirective } from "app/shared/queue.directive";

@Component({
  selector: 'subnavigation',
  template: `
    <queue [source]="navs" [queue]="queue" (newNode)="process($event)">
      <toggable *ngFor="let nav of queue" [id]="nav.key" [@flyInOut] (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
    </queue>
  `,
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        animate(300, keyframes([
          style({ transform: 'translateX(1000%)',}),
          style({ transform: 'translateX(-30px)' }),
          style({ transform: 'translateX(0)' })
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({ transform: 'translateX(0)',}),
          style({ transform: 'translateX(-30px)' }),
          style({ transform: 'translateX(1000%)' })
        ]))
      ])
    ])
  ]
})
export class SubnavigationComponent implements OnInit {
  navs: Array<Node>;
  queue: Array<Node> = [];

  @ViewChild(QueueDirective) queueDirective: QueueDirective;

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.navs = this.navigationService.getSubnavNodes();
  }

  whenOn(node: Node) {
    let tags = node.path.slice();
    let current: string[] = [];

    for (let tag in node.path) {
      current.push(node.path[tag]);

      this.queueDirective.produce(
        <Tags>{
          action: Action.Add,
          tags: current
        }
      );
    }
  }

  whenOff(node: Node) {
    this.queueDirective.produce(
      <Tags>{
        action: Action.Remove,
        tags: node.path
      }
    );
  }

  ngAfterViewInit() {
    this.queueDirective.connect();
  }

  process(){
  }

}
