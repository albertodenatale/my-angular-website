import { AppState, MAINNAV } from './../shared/skilltree';
import { Add, Remove } from './../reducers/nodes.actions';
import { Store } from '@ngrx/store';
import { OfToggablesDirective } from './../shared/of-toggables.directive';
import { ToggableService } from 'app/core/toggable.service';
import { TagService } from './../core/tag.service';
import { Tags, Action } from '../core/tags';
import { NavigationService } from './navigation.service';
import { Node } from './navigation';
import { Component, OnInit, trigger, state, style, transition, animate, ViewChild } from '@angular/core';
import { Subject } from "rxjs/Rx";
import { QueueDirective } from "app/shared/queue.directive";
import { ISkillTree, getByNavigationBarId, Skill } from "app/shared/skilltree";

@Component({
  selector: 'navigation',
  template: `
      <!--<button class="btn btn-primary pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i></button> -->
      <toggable *ngFor="let nav of navs" [isOn]="nav.isActive" [id]="nav.key" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
      <subnavigation></subnavigation>
     <!--< <div class="input-group">
        <input type="text" name="search" class="form-control" placeholder="keywords">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </span>
      </div>-->`
})
export class NavigationComponent {

  navs: Array<Skill>;
  
  @ViewChild(QueueDirective) queueDirective: QueueDirective;

  constructor(private store: Store<AppState>) {
    this.store.select<ISkillTree>(state => state.skillTree).subscribe(
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
