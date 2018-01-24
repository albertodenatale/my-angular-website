import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class AnimationService {

  private startSubnavAnimationSource = new Subject<boolean>();
  private showContentAndEducationSource = new Subject<boolean>();

  startSubAnimation$ = this.startSubnavAnimationSource.asObservable();
  showContentAndEducation$ = this.showContentAndEducationSource.asObservable();

  startSubAnimation() {
    this.startSubnavAnimationSource.next(true);
  }

  showEducationAndTraining() {
    this.showContentAndEducationSource.next(true);
  }

}