import { SUBNAV, AppState, MAINNAV } from './../shared/skilltree';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Node } from './navigation';
import 'rxjs/Rx';
import { ISkillTree, Skill, getByNavigationBarId, findSkill } from "app/shared/skilltree";
import { Add, Remove } from "app/reducers/actions";
import { style, trigger, state, transition, animate, keyframes, query, stagger } from "@angular/animations";

@Component({
  selector: 'subnavigation',
  template: `
    <div [@flyInOut]="navs.length">
      <toggable *ngFor="let nav of navs" [isOn]="nav.isActive" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
    </div>
  `,
  animations: [
    trigger('flyInOut', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter',
          stagger('200ms', [
            animate(300,
              keyframes([
                style({ opacity: 0, transform: 'translateX(1000%)', offset: 0 }),
                style({ opacity: 1, transform: 'translateX(-30px)', offset: 0.3 }),
                style({ transform: 'translateX(0)', offset: 1 })
              ])
            )
          ]), { optional: true }
        ),
        query(':leave',
          stagger('200ms', [
            animate(300,
              keyframes([
                style({ transform: 'translateX(0)' }),
                style({ transform: 'translateX(-30px)', opacity: 1 }),
                style({ transform: 'translateX(1000%)', opacity: 0 })
              ])
            )
          ]), { optional: true }
        )
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
    );
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
    if (this.navs == null) {
      this.navs = [];
    }

    var toAdd = selected.filter(
      node => {
        let parent: Skill = findSkill(skillTree, node.parentId);

        if (parent != null && parent.isActive) {
          let existing = this.navs.find(n => n.id === node.id);

          if (existing) {
            existing.isActive = node.isActive;

            return false;
          }

          return true;
        }

        return false;
      }
    );

    var toRemove = selected.filter(
      node => {
        let parent: Skill = findSkill(skillTree, node.parentId);

        if (parent != null && !parent.isActive) {
          return this.navs.some(n => n.id === node.id);
        }

        return false;
      }
    );

    this.navs = this.navs.concat(toAdd).filter(s => toRemove.find(r => r.id === s.id) == null);
  }

}
