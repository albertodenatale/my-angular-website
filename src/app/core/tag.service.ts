import { Tag } from './tag';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class TagService {

  constructor() { }

  private source = new Subject<Tag>();

  tagSource = this.source.asObservable();

  produce(tag:Tag){
    this.source.next(tag);
  }

}
