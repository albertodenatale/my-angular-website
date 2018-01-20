import { ToggableDirective } from './toggable.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsMobileDirective } from './is-mobile.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToggableDirective, IsMobileDirective],
  exports:[ToggableDirective, IsMobileDirective]
})
export class SharedModule { }
