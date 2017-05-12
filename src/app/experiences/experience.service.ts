import { Experience } from './experience';
import { Injectable } from '@angular/core';

@Injectable()
export class ExperienceService {

  getAll() : Iterable<Experience>{
    return [
      {
        title: 'Software Developer',
        place: 'Brightserve, Chichester',
        description: `Worked on the extension of two different angularjs/webapi2/SQLServer projects, mainly on authentication side installing
        and configuring ASP.NET Identity with JWT tokens. I also had the opportunity to work with GIT, Windows Workflow Foundation,
        Ninject, MOQ, bower and GRUNT`,
        period: 'Sept 2016 – 13 March 2017'
      }
    ]
  }

}
