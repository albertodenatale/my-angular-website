import { Tags } from 'app/core/tags';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Rx";

@Injectable()
export class TagService {

  public sources: Subject<[Subject<Tags>, Subject<Subject<Tags>>]> = new Subject<[Subject<Tags>, Subject<Subject<Tags>>]>();

  connect(reply:Subject<Subject<Tags>>): Subject<Tags> {
    let subject = new Subject<Tags>();

    this.sources.next([subject, reply]);

    return subject;
  };

}
