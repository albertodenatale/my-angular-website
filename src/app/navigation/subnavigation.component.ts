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
import { OfToggablesDirective } from "app/shared/of-toggables.directive";

@Component({
  selector: 'subnavigation',
  template: `
    <queue ofToggables [source]="navs" [queue]="queue" (newNode)="process($event)">
      <toggable *ngFor="let nav of queue" [id]="nav.key" [@flyInOut] (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
    </queue>
  `,
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        animate(300, keyframes([
          style({ transform: 'translateX(1000%)', }),
          style({ transform: 'translateX(-30px)' }),
          style({ transform: 'translateX(0)' })
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({ transform: 'translateX(0)', }),
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

    this.queueDirective.produce(
      <Tags>{
        action: Action.Add,
        tags: tags
      }
    );

    this.process(
      <Tags>{
        action: Action.Add,
        tags: tags
      });
  }

  whenOff(node: Node) {
    this.queueDirective.produce(
      <Tags>{
        action: Action.Remove,
        tags: node.path
      }
    );

    this.process(
      <Tags>{
        action: Action.Remove,
        tags: node.path
      });

  }

  ngAfterViewInit() {
    this.queueDirective.connect();
  }

  process(tag: Tags) {
    if (tag.action === Action.Add) {
      let potential: Node[] = this.navs.filter(n => {
        let intersection = tag.tags.filter(r => n.path.indexOf(r) > -1 && n.path.length <= tag.tags.length + 1);

        return intersection.length === tag.tags.length || intersection.length > 0 && (n.path.length < tag.tags.length || n.path.length === tag.tags.length && intersection.length === tag.tags.length - 1);
      });

      potential.forEach(n => {
        let index = this.queue.indexOf(n);

        if (index < 0) {
          this.queue.push(n);
        }
      })
    }
    else if (tag.action === Action.Remove) {
      let descendants: Node[] = this.queue.filter(
        n => {
          let intersection = tag.tags.filter(r => n.path.indexOf(r) > -1);

          return intersection.length === tag.tags.length && n.path.length > tag.tags.length;
        }
      );

      descendants.forEach(d => {
        this.remove(d);
      });
    }
  }

  private remove(node: Node) {
    let index = this.queue.indexOf(node);

    if (index >= 0) {
      this.queue.splice(index, 1);
    }
  }

}
