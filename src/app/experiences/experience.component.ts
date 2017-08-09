import { Store } from '@ngrx/store';
import { ISkillTree, Skill, getByNavigationBarId, AppState } from './../shared/skilltree';
import { QueueDirective } from './../shared/queue.directive';
import { Subject } from 'rxjs/Subject';
import { TagService } from './../core/tag.service';
import { Experience } from './experience';
import { Component, OnInit, Input, ContentChild, ViewChild, Directive } from '@angular/core';
import { NavigationService } from "app/navigation/navigation.service";
import { Node } from '../navigation/navigation';
import { Tags, Action } from "app/core/tags";
import { OfToggablesDirective } from "app/shared/of-toggables.directive";
import { Add, Remove } from "app/reducers/nodes.actions";

@Component({
  selector: 'experience',
  template: `
    <div class="col-3 first">
      <strong>{{experience.period}}</strong>
    </div>
    <div class="col second">
      <h5>{{experience.title}}
          <toggable *ngFor="let nav of navs" [isOn]="nav.isActive" [id]="nav.key" class="btn-sm" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
      </h5>
      <div>{{experience.place}}</div>
      <div>{{experience.description}}</div>
    </div>`
})
export class ExperienceComponent {

  @Input()
  experience: Experience;

  navs: Array<Skill>

  constructor(private store: Store<AppState>) {
    this.store.select<ISkillTree>(state => state.skillTree).subscribe(
      skillTree => {
        this.navs = getByNavigationBarId(skillTree, "test");
      }
    )
  }

  whenOn(skill: Skill) {
    this.store.dispatch(
      new Add(skill.id)
    )
  }

  whenOff(skill: Skill) {
    this.store.dispatch(
      new Remove(skill.id)
    )
  }

}
