import { ToggableDirective } from './toggable.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueDirective } from './queue.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToggableDirective, QueueDirective],
  exports:[ToggableDirective, QueueDirective]
})
export class SharedModule { }
