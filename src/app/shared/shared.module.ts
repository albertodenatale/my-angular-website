import { ToggableDirective } from './toggable.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueDirective } from './queue.directive';
import { OfToggablesDirective } from './of-toggables.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToggableDirective, QueueDirective, OfToggablesDirective],
  exports:[ToggableDirective, QueueDirective, OfToggablesDirective]
})
export class SharedModule { }
