import { ToggableComponent } from './toggable.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueueDirective } from './queue.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToggableComponent, QueueDirective],
  exports:[ToggableComponent, QueueDirective]
})
export class SharedModule { }
