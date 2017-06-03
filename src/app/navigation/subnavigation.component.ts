import { Tags } from './../core/tags';
import { Observable } from 'rxjs/Observable';
import { TagService } from './../core/tag.service';
import { Action } from '../core/tags';
import { NavigationService } from './navigation.service';
import { Component, OnInit, trigger, state, transition, style, animate, keyframes } from '@angular/core';
import { Node } from './navigation';
import 'rxjs/Rx';

@Component({
  selector: 'subnavigation',
  template: `
    <queue [source]="navs" [queue]="queue" (newNode)="process($event)">
      <toggable *ngFor="let t of queue" [id]="t.key" [@flyInOut] (click)="produce(t)">{{t.label}}</toggable>
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

  queue: Array<Node> = new Array<Node>();

  constructor(private navigationService: NavigationService, private tagService: TagService) { }

  ngOnInit() {
    this.navs = this.navigationService.getSubnavNodes();
  }

  produce(node: Node) {
    let tags = node.path.slice();

    this.tagService.produce(
      <Tags>{
        action: Action.Add,
        tags: tags
      }
    );
  }

  process(tag:Tags){
    // get potential paths matching --> nav intersect path
    let potential: Node[] = this.navs.filter(n => {
      let intersection = tag.tags.filter(r => n.path.indexOf(r) > -1 && n.path.length <= tag.tags.length+1);

      return intersection.length  === tag.tags.length || intersection.length > 0 && n.path.length <= tag.tags.length;
    });

    // intersezione potenziale e esistente
    let intersection : Node[] = this.queue.filter(n => {
      let intersection = potential.filter(p => n.path.indexOf(p.key) > -1 && n.path.length <= tag.tags.length+1);

      return intersection.length  === tag.tags.length || intersection.length > 0 && n.path.length <= tag.tags.length;
    });

    // se è vuota, da aggiungere e.g angular
    if(intersection.length === 0){
      potential.forEach(n => this.queue.push(n));
    }
    // se è piena, e stessa lunghezza, rimuovere tutti eg. frontend
    else if(intersection.length === potential.length){
      this.queue.filter(p => p.path.length > tag.tags.length).forEach(n => this.remove(n));
    }
    // se è non vuota, rimuovere figli
    else if(intersection.length > 0){
      potential.forEach(n =>{
        let index = this.queue.indexOf(n);

        if(index < 0){
          this.queue.push(n);
        }
      })
    }
  }

  private remove(node: Node) {
    let index = this.queue.indexOf(node);

    if (index >= 0) {
      this.queue.splice(index, 1);
    }
  }

}
