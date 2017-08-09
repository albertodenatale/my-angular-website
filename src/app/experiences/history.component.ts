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
<!--      <experience *ngFor="let experience of queue" [experience]="experience" class="row"></experience> -->
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

  process(tag: Tags) {
    let skill = tag.tags[tag.tags.length - 1];

    if (tag.action === Action.Add) {
      let isNarrow: boolean = false;

      let paths = this.activePaths.filter(path => {
        let intersection = tag.tags.filter(t => path.indexOf(t) > -1);

        if (intersection.length > 0 && tag.tags.length !== path.length) {
          isNarrow = true;

          return true;
        }

        return false;
      });

      if (paths.length > 1) {
        throw Error("Only one path at the time can be added");
      }


      if (isNarrow) {
        let path = paths[0];
        for (var index = 0; index < tag.tags.length; index++) {
          var element = tag.tags[index];

          if (path.indexOf(element) === -1) {
            path.push(element);
          }
        }
        this.narrow(skill);
      }
      else {
        this.addPath(tag.tags);
        this.expand(skill);
      }
    }
    else {
      let isExpand = false;

      let paths = this.activePaths.filter(path => {
        let intersection = tag.tags.filter(t => path.indexOf(t) > -1);

        if (intersection.length === tag.tags.length) {
          let hasSiblings = this.activePaths.some(path => {
            let intersection = tag.tags.filter(t => path.indexOf(t) > -1);

            return intersection.length === path.length - 1 && path.length === tag.tags.length;
          });

          if (!hasSiblings) {
            let start = path.indexOf(skill);

            if (start > 0) {
              isExpand = true;
              path.splice(start, path.length);
            }
          }

          return true;
        }

        return false;
      });

      if (paths.length === 0) {
        throw Error("One path should be selected");
      }

      let path = paths[0];

      if (isExpand) {
        this.expand(path[path.length - 1]);
      }
      else {
        paths.forEach(path => {
          this.removePath(path);
        });
      }
      this.addMissings();
    }
  }

  private narrow(skill) {
    this.queue = this.queue.filter(element => element.path.indexOf(skill) > -1);
  }

  private expand(skill: string) {
    let toAdd = this.experiences.filter(e => e.path.indexOf(skill) > -1).filter(f => this.queue.filter(ve => ve.id === f.id).length === 0);

    toAdd.forEach(element => {
      this.queue.push(element);
    });
  }

  private addMissings() {
    let shouldBeIn = this.experiences
      .filter(experience => {
        let shouldBe = this.activePaths.some(path => {
          let intersection = path.filter(p => experience.path.indexOf(p) > -1);

          return intersection && intersection.length >= path.length;
        });

        return shouldBe;
      })
      .filter(experience => {
        let index = this.queue.indexOf(experience);

        return index === -1;
      });

    shouldBeIn.forEach(element => {
      this.queue.push(element);
    });
  }

  private addPath(path: string[]) {
    this.activePaths.push(path);
  }

  private removePath(path: string[]) {
    this.remove(this.activePaths, path);
    let toRemove = this.queue
      .filter(e => e.path.indexOf(path[path.length - 1]) > -1)
      .filter(element => {

        let isActive = this.activePaths.some(activePath => {
          let intersection = activePath.filter(s => element.path.indexOf(s) > -1);

          return intersection && intersection.length >= activePath.length;
        });

        return !isActive;

      });

    toRemove.forEach(element => {
      this.remove(this.queue, element);
    });

  }


  private remove<T>(list: T[], node: T): T[] {
    let index = list.indexOf(node);

    if (index >= 0) {
      return list.splice(index, 1);
    }
  }

}
