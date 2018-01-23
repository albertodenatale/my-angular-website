import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
    
  private loadingStatusSource = new Subject<any>();
  private isNavLoaded: boolean = false;
  private isHistoryLoaded: boolean = false;

  loadingStatus$ = this.loadingStatusSource.asObservable();

  navigationLoaded() {
    if(this.isNavLoaded === false && this.isHistoryLoaded === false){
      this.loadingStatusSource.next({
        progress: 50,
        threshold: 80,
      });

      this.isNavLoaded = true;
    }
  }

  mainContentRendered() {
    if(this.isNavLoaded === true && this.isHistoryLoaded === false){
      this.loadingStatusSource.next({
        progress: 100,
        threshold: 100
      });

      this.isHistoryLoaded = true;
    }
  }

}
