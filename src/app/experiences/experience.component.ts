import { TagService } from './../core/tag.service';
import { Experience } from './experience';
import { Component, OnInit, Input } from '@angular/core';
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
          <toggable *ngFor="let nav of queue" [id]="nav.key" class="btn-sm" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
      </h5>
      <div>{{experience.place}}</div>
      <div>{{experience.description}}</div>
    </div>`
})
export class ExperienceComponent implements OnInit {

  @Input()
  experience: Experience;

  queue: Array<Node>;

  constructor(private navigationService: NavigationService, private tagService: TagService) { }

  ngOnInit() {
    this.queue = this.navigationService.getExperienceSubnav(this.experience);
  }

  whenOn(node: Node) {
    let tags = node.path.slice();
    tags.push(node.key);

    this.tagService.produce(
      <Tags>{
        action: Action.Add,
        tags: tags
      }
    );
  }

  whenOff(node: Node) {
    let tags = node.path.slice();
    tags.push(node.key);

    this.tagService.produce(
      <Tags>{
        action: Action.Remove,
        tags: tags
      }
    );
  }

}
