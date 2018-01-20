import { findSkill } from 'app/shared/skilltree';
import { Store } from '@ngrx/store';
import { ISkillTree, Skill, getByNavigationBarId, AppState, enumerateTree } from './../shared/skilltree';
import { Subject } from 'rxjs/Subject';
import { Experience, Period, ParsePeriod } from './experience';
import { Component, OnInit, Input, ContentChild, ViewChild, Directive } from '@angular/core';
import { Node } from '../navigation/navigation';
import { Add, Remove } from "app/reducers/actions";
import { ExperienceService } from 'app/experiences/experience.service';

@Component({
  selector: 'experience',
  template: `
    <i *ngIf="isEditable" (click)="deleteExperience(experience)" class="fa fa-trash-o" aria-hidden="true"></i>
    <div class="col-12 col-lg-9 push-lg-3 second">
      <h5 editable (contentChanges)="updateTitle(experience, $event)">{{experience.title}}</h5>
    </div>
    <div class="col-12 col-lg-3 pull-lg-9 first">
      <strong editable (contentChanges)="updatePeriod(experience, $event)">{{experience | period}}</strong>
    </div>
    <div class="col-12 col-lg-9 push-lg-3 col second">
      <toggable *ngFor="let nav of navs" [isOn]="nav.isActive" class="btn-sm" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
      <div editable (contentChanges)="updatePlace(experience, $event)">{{experience.place}}</div>
      <div editable (contentChanges)="updateDescription(experience, $event)">{{experience.description}}</div>
    </div>`
})
export class ExperienceComponent {

  @Input()
  experience: Experience;

  navs: Array<Skill> = [];

  isEditable: boolean;

  constructor(private store: Store<AppState>, private experienceService: ExperienceService) { }

  ngOnInit() {
    this.store.select<AppState>(state => state).subscribe(
      state => {
        this.navs = [];

        this.experience.path.forEach(skillId => {
          let skill: Skill = findSkill(state.navigation, skillId);

          this.navs.push(skill);
        });

        if (state.authentication != null) {
          this.isEditable = true;
        }
        else {
          this.isEditable = false;
        }
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

  updateTitle(experience, newTitle: string) {
    this.experienceService.updateExperience(experience, { title: newTitle });
  }

  updatePlace(experience, newPlace: string) {
    this.experienceService.updateExperience(experience, { place: newPlace });
  }

  updateDescription(experience, description: string) {
    this.experienceService.updateExperience(experience, { description: description });
  }

  updatePeriod(experience, period: string) {
    this.experienceService.updateExperience(experience, { period: ParsePeriod(period) });
  }

  deleteExperience(experience) {
    this.experienceService.deleteExperience(experience);
  }

}
