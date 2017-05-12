import { Experience } from './experience';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'experience',
  template: `
  <div class="row history entry">
    <div class="col-3 first">
      <strong>{{experience.period}}</strong>
    </div>
    <div class="col second">
      <h5>{{experience.title}}</h5>
      <div>{{experience.place}}</div>
      <div>{{experience.description}}</div>
    </div>
  </div>`
})
export class ExperienceComponent implements OnInit {

  @Input()
  experience:Experience;

  ngOnInit() {
  }

}
