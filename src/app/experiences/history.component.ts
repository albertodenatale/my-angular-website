import { FetchInitialState, FetchMainContent } from './../reducers/actions';
import { Store } from '@ngrx/store';
import { ExperienceComponent } from './experience.component';
import { element } from 'protractor';
import { ExperienceService } from './experience.service';
import { Experience, mapFromSnapshot } from './experience';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { AppState, ISkillTree, convertToRegex, enumerateTree } from "app/shared/skilltree";
import { style, trigger, state, transition, animate, keyframes, query, stagger } from "@angular/animations";

@Component({
  selector: 'history',
  template: `
     <div [@flyInOut]="weight">
       <experience *ngFor="let experience of queue | sortByDateFrom" [experience]="experience" class="row"></experience>
     </div>
     <button *ngIf="isEditable==true" class="btn btn-primary" (click)="addEmptyExperience()">Add</button>
    `,
  animations: [
    trigger('flyInOut', [
      transition('* => *', [
        query('experience', style({ opacity: 0 }), { optional: true }),
        query('experience',
          stagger('200ms', [
            animate(300,
              keyframes([
                style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
                style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
              ])
            )
          ]), { optional: true }
        )
      ])
    ])
  ]
})
export class HistoryComponent implements OnInit {
  experiences: Array<Experience> = new Array<Experience>();
  queue: Array<Experience> = [];
  isEditable: boolean = false;
  weight = 0;

  constructor(private store: Store<AppState>, private experienceService: ExperienceService) {
    this.store.select<AppState>((state) => state).subscribe(
      state => {
        if (state.authentication != null) {
          this.isEditable = true;
        }
        else {
          this.isEditable = false;
        }

        if (state.navigation.isLoaded && state.main.isLoaded) {
          this.handleHistoryReload();
          this.process(state);
        }

      }
    );
  }

  ngOnInit() {
    this.store.dispatch(new FetchMainContent());
  }

  process(state: AppState) {
    var regex: Array<RegExp> = convertToRegex(state.navigation);

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

          if (isMatch) {
            let relevancy = 0;
            
            for (var skill of Array.from(enumerateTree(state.navigation))) {
              if (skill.isActive && e.path.find(p => p === skill.id)) {
                relevancy += 1;
                this.weight += 1;
              }
            }

            e.relevancy = relevancy;
          }

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
      else {
        this.queue = [];
      }
    }
    else {
      this.queue = [];
    }
  }

  handleHistoryReload() {
    if (this.experiences == null || this.experiences.length === 0) {
      this.experienceService.experiences
        .snapshotChanges()
        .map(snapshots => {
          return snapshots.map(s => mapFromSnapshot(s))
        })
        .subscribe(experiences => {
          this.experiences = experiences;

          var toRemove = this.queue.filter(q => this.experiences.find(e => e.id === q.id) == null);

          var toAdd = this.experiences.filter(e => e.path.find(p => p === "new")).filter(e => this.queue.find(q => q.id === e.id) == null);

          this.queue = this.queue.concat(toAdd).filter(s => toRemove.find(r => r.id === s.id) == null);
        })
    }
  }

  addEmptyExperience() {
    var newExperience = new Experience();

    this.experienceService.addExperience(newExperience);
  }
}
