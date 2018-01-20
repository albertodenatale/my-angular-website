import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[isMobile], isMobile'
})
export class IsMobileDirective {

  @Output()
  isMobile: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {

  }

  ngOnInit() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.isMobile.emit(true);
    }
    else {
      this.isMobile.emit(false);
    }
  }

}
