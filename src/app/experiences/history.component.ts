import { Store } from '@ngrx/store';
import { ExperienceComponent } from './experience.component';
import { element } from 'protractor';
import { QueueDirective } from './../shared/queue.directive';
import { Action } from 'app/core/tags';
import { Tags } from './../core/tags';
import { ExperienceService } from './experience.service';
import { Experience } from './experience';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { AppState, ISkillTree, convertToRegex } from "app/shared/skilltree";

@Component({
  selector: 'history',
  template: `
     <experience *ngFor="let experience of queue" [experience]="experience" class="row"></experience>
    `
})
export class HistoryComponent implements OnInit {
  experiences: Array<Experience> = new Array<Experience>();
  queue: Array<Experience> = [];

  constructor(private experienceService: ExperienceService, private store: Store<AppState>) {
    this.store.select<ISkillTree>((state) => state.skillTree).subscribe(
      skillTree => {
        this.process(skillTree);
      }
    )
  }

  ngOnInit() {
    this.experiences = this.experienceService.getAll();
  }

  process(skillTree: ISkillTree) {
    var regex: Array<RegExp> = convertToRegex(skillTree);

    if (regex && regex.length > 0) {
      let selected: Array<Experience> = this.experiences.filter(
        e => {
          let path: string = e.path.join(' ');
          let isMatch: boolean = true;

          regex.forEach(r => {
            if (path.match(r) == null) {
              isMatch = false;
            }
          });

          return isMatch;
        }
      );

      if (selected != null && selected.length > 0) {
        let toAdd: Array<Experience> = selected.filter(
          e => {
            if (this.queue.find(existing => existing.id === e.id) == null) {
              return true;
            }

            return false;
          }
        );

        let toRemove: Array<Experience> = this.queue.filter(
          existing => {
            if (selected.find(e => e.id === existing.id) == null) {
              return true;
            }

            return false;
          }
        );

        this.queue = this.queue.concat(toAdd).filter(s => toRemove.find(r => r.id === s.id) == null);
      }
    }
    else {
      this.queue = [];
    }
  }
}
