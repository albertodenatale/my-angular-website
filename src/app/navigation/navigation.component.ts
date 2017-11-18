import { AppState, MAINNAV } from './../shared/skilltree';
import { Add, Remove } from '../reducers/actions';
import { Store } from '@ngrx/store';
import { Node } from './navigation';
import { Component, OnInit, trigger, state, style, transition, animate, ViewChild } from '@angular/core';
import { Subject } from "rxjs/Rx";
import { ISkillTree, getByNavigationBarId, Skill } from "app/shared/skilltree";

@Component({
  selector: 'navigation',
  template: `
      <toggable *ngFor="let nav of navs" [isOn]="nav.isActive" [id]="nav.key" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
      <subnavigation></subnavigation>`
})
export class NavigationComponent {

  navs: Array<Skill>;
  
  constructor(private store: Store<AppState>) {
    this.store.select<ISkillTree>(state => state.navigation).subscribe(
      skillTree => {
        this.navs = getByNavigationBarId(skillTree, MAINNAV);
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
