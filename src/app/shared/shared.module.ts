import { LineComponent } from './line.component';
import { ToggableDirective } from './toggable.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LineComponent, ToggableDirective],
  exports:[LineComponent, ToggableDirective]
})
export class SharedModule { }
