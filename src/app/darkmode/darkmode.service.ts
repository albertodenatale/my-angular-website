import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
    private darkModeOnOrOffSource = new Subject<boolean>();
    
    darkModeOnOrOff$ = this.darkModeOnOrOffSource.asObservable();

    turnDarkModeOn() {
        this.darkModeOnOrOffSource.next(true);
    }

    turnDarkModeOff() {
        this.darkModeOnOrOffSource.next(false);
    }
}