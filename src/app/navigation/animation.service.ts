import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class AnimationService {
    
  private startSubnavAnimationSource = new Subject<boolean>();

  startSubAnimation$ = this.startSubnavAnimationSource.asObservable();

  startSubAnimation() {
    this.startSubnavAnimationSource.next(true);
  }

}