import { findSkill } from 'app/shared/skilltree';
import { Store } from '@ngrx/store';
import { ISkillTree, Skill, getByNavigationBarId, AppState, enumerateTree } from './../shared/skilltree';
import { Subject } from 'rxjs/Subject';
import { Experience } from './experience';
import { Component, OnInit, Input, ContentChild, ViewChild, Directive } from '@angular/core';
import { Node } from '../navigation/navigation';
import { Add, Remove } from "app/reducers/actions";

@Component({
  selector: 'experience',
  template: `
    <div class="col-3 first">
      <strong>{{experience.period}}</strong>
    </div>
    <div class="col second">
      <h5 editable>{{experience.title}}</h5>
      <toggable *ngFor="let nav of navs" [isOn]="nav.isActive" [id]="nav.key" class="btn-sm" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
      <div editable>{{experience.place}}</div>
      <div editable>{{experience.description}}</div>
    </div>`
})
export class ExperienceComponent {

  @Input()
  experience: Experience;

  navs: Array<Skill> = [];

  isEditable:boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select<ISkillTree>(state => state.navigation).subscribe(
      skillTree => {
        this.navs = [];

        this.experience.path.forEach(skillId => {
          let skill: Skill = findSkill(skillTree, skillId);

          this.navs.push(skill);
        });
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
