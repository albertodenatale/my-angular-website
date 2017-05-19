import { Observable } from 'rxjs/Observable';
import { TagService } from './../core/tag.service';
import { Tags, Action } from '../core/tags';
import { NavigationService } from './navigation.service';
import { Component, OnInit, trigger, state, transition, style, animate } from '@angular/core';
import { Node } from './navigation';
import 'rxjs/Rx';

@Component({
  selector: 'subnavigation',
  template: `
    <queue [data]="navs" [queue]="queue"></queue>
    <toggable *ngFor="let t of queue" [@flyInOut]="'in'">{{t.label}}</toggable>
  `,
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(1000%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(1000%)' }))
      ])
    ])
  ]

})
export class SubnavigationComponent implements OnInit {

  navs: { [key: string]: Array<Node> };
  queue: Array<Node> = new Array<Node>();

  constructor(private navigationService: NavigationService, private tagService: TagService) { }

  ngOnInit() {
    this.navs = this.navigationService.getSubnavNodes();
  }

}
