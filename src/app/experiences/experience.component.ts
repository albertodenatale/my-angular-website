import { Experience } from './experience';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'experience',
  template: `
    <div class="col-3 first">
      <strong>{{experience.period}}</strong>
    </div>
    <div class="col second">
      <h5>{{experience.title}}
        <toggable class="btn-sm">.NET</toggable>
        <toggable class="btn-sm">C#</toggable>
        <toggable class="btn-sm">ASP.NET Identity</toggable>
        <toggable class="btn-sm">Webapi 2</toggable>
        <toggable class="btn-sm">Ninject</toggable>
        <toggable class="btn-sm">MOQ</toggable>
        <toggable class="btn-sm">WF</toggable>
        <toggable class="btn-sm">EF</toggable>
      </h5>
      <div>{{experience.place}}</div>
      <div>{{experience.description}}</div>
    </div>`
})
export class ExperienceComponent implements OnInit {

  @Input()
  experience:Experience;

  ngOnInit() {
  }

}
