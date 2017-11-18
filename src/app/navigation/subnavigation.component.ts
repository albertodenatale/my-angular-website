import { SUBNAV, AppState, MAINNAV } from './../shared/skilltree';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, trigger, state, transition, style, animate, keyframes, ViewChild } from '@angular/core';
import { Node } from './navigation';
import 'rxjs/Rx';
import { ISkillTree, Skill, getByNavigationBarId, findSkill } from "app/shared/skilltree";
import { Add, Remove } from "app/reducers/actions";

@Component({
  selector: 'subnavigation',
  template: `
      <toggable *ngFor="let nav of navs" [id]="nav.key" [@flyInOut] (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
  `,
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        animate(300, keyframes([
          style({ transform: 'translateX(1000%)', }),
          style({ transform: 'translateX(-30px)' }),
          style({ transform: 'translateX(0)' })
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({ transform: 'translateX(0)', }),
          style({ transform: 'translateX(-30px)' }),
          style({ transform: 'translateX(1000%)' })
        ]))
      ])
    ])
  ]
})
export class SubnavigationComponent {
  navs: Array<Skill>;

  constructor(private store: Store<AppState>) {
    this.store.select<ISkillTree>((state) => state.navigation).subscribe(
      skillTree => {
        this.process(skillTree, getByNavigationBarId(skillTree, SUBNAV));
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

  process(skillTree: ISkillTree, selected: Array<Skill>): void { 
    if(this.navs == null){
      this.navs = [];
    }

    var toAdd = selected.filter(
      node => {
        let parent: Skill = findSkill(skillTree, node.parentId);

        if (parent != null) {
          if(parent.isActive){
            return !this.navs.some(n => n.id === node.id);
          }
        }

        return false;
      }
    );

    var toRemove = selected.filter(
      node => {
        let parent: Skill = findSkill(skillTree, node.parentId);

        if (parent != null) {
          if(!parent.isActive){
            return this.navs.some(n => n.id === node.id);
          }
        }

        return false;
      }
    );

    this.navs = this.navs.concat(toAdd).filter(s => toRemove.find(r => r.id === s.id) == null);
  }

}
