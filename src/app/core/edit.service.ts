import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class EditService {

  private newPositionSource = new Subject<string[]>();

  newPosition$ = this.newPositionSource.asObservable();

  constructor(private db: AngularFireDatabase){ }

  setNewPosition(x: string, y: string) {
    this.newPositionSource.next([x, y]);
  }

  hide() {
    this.newPositionSource.next(null);
  }

}
