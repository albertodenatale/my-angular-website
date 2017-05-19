import { ExperienceService } from './experience.service';
import { Experience } from './experience';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'history',
  template: `
    <queue [source]="experiences" [queue]="queue"></queue>
    <experience *ngFor="let experience of queue" [experience]="experience" class="row"></experience>
    `
})
export class HistoryComponent implements OnInit {
  experiences:Iterable<Experience> = new Array<Experience>();
  queue:Array<Experience> = new Array<Experience>();

  constructor(private service:ExperienceService) { }

  ngOnInit() {
    this.experiences = this.service.getAll();
  }

}
