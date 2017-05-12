import { ExperienceService } from './experience.service';
import { Experience } from './experience';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'history',
  template: `
    <experience *ngFor="let experience of experiences" [experience]="experience"></experience>
    `
})
export class HistoryComponent implements OnInit {
  experiences:Iterable<Experience>;

  constructor(private service:ExperienceService) { }

  ngOnInit() {
    this.experiences = this.service.getAll();
  }

}
