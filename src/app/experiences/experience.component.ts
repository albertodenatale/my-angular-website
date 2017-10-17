import { Store } from '@ngrx/store';
import { ISkillTree, Skill, getByNavigationBarId, AppState } from './../shared/skilltree';
import { Subject } from 'rxjs/Subject';
import { Experience } from './experience';
import { Component, OnInit, Input, ContentChild, ViewChild, Directive } from '@angular/core';
import { NavigationService } from "app/navigation/navigation.service";
import { Node } from '../navigation/navigation';
import { Add, Remove } from "app/reducers/nodes.actions";

@Component({
  selector: 'experience',
  template: `
    <div class="col-3 first">
      <strong>{{experience.period}}</strong>
    </div>
    <div class="col second">
      <h5>{{experience.title}}
      </h5>
      <div>{{experience.place}}</div>
      <div>{{experience.description}}</div>
    </div>`
})
export class ExperienceComponent {

  @Input()
  experience: Experience;
  
}
