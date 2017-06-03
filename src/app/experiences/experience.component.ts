import { QueueDirective } from './../shared/queue.directive';
import { Subject } from 'rxjs/Subject';
import { TagService } from './../core/tag.service';
import { Experience } from './experience';
import { Component, OnInit, Input, ContentChild, ViewChild, Directive } from '@angular/core';
import { NavigationService } from "app/navigation/navigation.service";
import { Node } from '../navigation/navigation';
import { Tags, Action } from "app/core/tags";

@Component({
  selector: 'experience',
  template: `
    <div class="col-3 first">
      <strong>{{experience.period}}</strong>
    </div>
    <div class="col second">
      <h5>{{experience.title}}
        <queue [source]="navs">
          <toggable *ngFor="let nav of navs" [id]="nav.key" class="btn-sm" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
        </queue>
      </h5>
      <div>{{experience.place}}</div>
      <div>{{experience.description}}</div>
    </div>`
})
export class ExperienceComponent {

  @Input()
  experience: Experience;

  navs: Array<Node>

  @ViewChild(QueueDirective) queueDirective: QueueDirective;

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.navs = this.navigationService.getExperienceSubnav(this.experience);
  }  

  ngAfterViewInit() {
    this.queueDirective.connect();
  }

  whenOn(node: Node) {
    let tags = node.path.slice();

    this.queueDirective.produce(
      <Tags>{
        action: Action.Add,
        tags: tags
      }
    );
  }

  whenOff(node: Node) {
    this.queueDirective.produce(
      <Tags>{
        action: Action.Remove,
        tags: node.path
      }
    );
  }

}
