import { ExperienceComponent } from './experience.component';
import { element } from 'protractor';
import { QueueDirective } from './../shared/queue.directive';
import { Action } from 'app/core/tags';
import { Tags } from './../core/tags';
import { ExperienceService } from './experience.service';
import { Experience } from './experience';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'history',
  template: `
    <queue (newNode)="process($event)">
      <experience *ngFor="let experience of queue" [experience]="experience" class="row"></experience>
    </queue>
    `
})
export class HistoryComponent implements OnInit {
  experiences: Array<Experience> = new Array<Experience>();
  queue: Array<Experience> = [];
  activePaths: Array<string[]> = [];

  @ViewChild(QueueDirective) queueDirective: QueueDirective;

  @ViewChildren(ExperienceComponent)
  visibleExperiences: QueryList<ExperienceComponent>;

  constructor(private service: ExperienceService) { }

  ngOnInit() {
    this.experiences = this.service.getAll();
  }

  ngAfterViewInit() {
    this.queueDirective.connect();
  }

  process(tag: Tags) {
    let skill = tag.tags[tag.tags.length - 1];

    if (tag.action === Action.Add) {
      let isFilter: boolean = false;

      this.activePaths.forEach(path => {
        let intersection = tag.tags.filter(t => path.indexOf(t) > -1);

        if (intersection.length > 0) {
          path.push(skill);
          isFilter = true;
        }
      });

      if (isFilter) {
        this.queue = this.queue.filter(element => element.path.indexOf(skill) > -1);
      }
      else {
        this.activePaths.push([skill]);
        let toAdd = this.experiences.filter(e => e.path.indexOf(skill) > -1);

        toAdd.forEach(element => {
          this.queue.push(element);
        });
      }

    }
  }

  private remove<T>(list: T[], node: T): T[] {
    let index = list.indexOf(node);

    if (index >= 0) {
      return list.splice(index, 1);
    }
  }

}
