import { Observable } from 'rxjs/Observable';
import { TagService } from './../core/tag.service';
import { Tag } from './../core/tag';
import { NavigationService } from './navigation.service';
import { Component, OnInit, trigger, state, transition, style, animate } from '@angular/core';
import { Node } from './navigation';
import 'rxjs/Rx';

@Component({
  selector: 'subnavigation',
  template: `
    <toggable *ngFor="let nav of nav" [@flyInOut]="'in'">{{nav.label}}</toggable>
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
  nav: Array<Node> = new Array<Node>();

  constructor(private navigationService: NavigationService, private tagService: TagService) { }

  ngOnInit() {
    this.navs = this.navigationService.getSubnavNodes();

    this.tagService.tagSource.subscribe(
      (t: Tag) => {
        let selected = this.navs[t.tag];
        if (selected) {
          this.activateSubnav(selected, t.action);
        }
      }
    )
  }

  private activateSubnav(subnav: Node[], action: string) {
    let interval: number = action == "add" ? 200 : 200 * subnav.length;
    
    subnav.forEach(
      t => {
        setTimeout(() => {
          if (action == "add") {
            this.nav.push(t);
          }
          else if (action == "remove") {
            this.remove(t)
          }
        }, interval);

        if (action == "add") {
          interval += 200;
        }
        else {
          interval -= 200;
        }
      });
  }

  private remove(node: Node) {
    let index = this.nav.indexOf(node);

    if (index >= 0) {
      this.nav.splice(index, 1);
    }
  }

}
