import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'experience',
  template: `
  <div class="row history entry">
    <div class="col-3 first">
      <strong>Sept 2016 – 13 March 2017</strong>
    </div>
    <div class="col second">
      <h5>Software Engineer</h5>
      <div>Brightserve, Chichester</div>
      <div>Worked on the extension of two different angularjs/webapi2/SQLServer projects, mainly on authentication side installing
        and configuring ASP.NET Identity with JWT tokens. I also had the opportunity to work with GIT, Windows Workflow Foundation,
        Ninject, MOQ, bower and GRUNT
      </div>
    </div>
  </div>`
})
export class ExperienceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
