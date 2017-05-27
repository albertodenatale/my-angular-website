import { ExperienceService } from './experience.service';
import { Experience } from './experience';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'history',
  template: `
    <queue [source]="experiences">
      <experience *ngFor="let experience of experiences" [experience]="experience" class="row"></experience>
    </queue>
    `
})
export class HistoryComponent implements OnInit {
  experiences:Iterable<Experience> = new Array<Experience>();

  constructor(private service:ExperienceService) { }

  ngOnInit() {
    this.experiences = this.service.getAll();
  }

}
