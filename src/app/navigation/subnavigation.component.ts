import { Observable } from 'rxjs/Observable';
import { TagService } from './../core/tag.service';
import { Tags, Action } from '../core/tags';
import { NavigationService } from './navigation.service';
import { Component, OnInit, trigger, state, transition, style, animate, keyframes } from '@angular/core';
import { Node } from './navigation';
import 'rxjs/Rx';

@Component({
  selector: 'subnavigation',
  template: `
    <queue [source]="navs">
      <toggable *ngFor="let t of navs" [id]="t.key" [@flyInOut]>{{t.label}}</toggable>
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

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.navs = this.navigationService.getSubnavNodes();
  }

}
