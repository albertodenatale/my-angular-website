import { Action } from 'app/core/tags';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class ToggableService {

  private source = new Subject<ToggleAction>();

  toggables = this.source.asObservable();

  produce(action:ToggleAction){
    this.source.next(action);
  }

}

export class ToggleAction{
  id:string;
  action:Action;
}
