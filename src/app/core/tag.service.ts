import { Tags } from './tags';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class TagService {

  private source = new Subject<Tags>();

  tagSource = this.source.asObservable();

  produce(tag:Tags){
    this.source.next(tag);
  }

}
