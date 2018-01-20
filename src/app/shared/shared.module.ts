import { ToggableDirective } from './toggable.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToggableDirective],
  exports:[ToggableDirective]
})
export class SharedModule { }
