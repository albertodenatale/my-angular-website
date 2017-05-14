import { ToggableComponent } from './toggable.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToggableComponent],
  exports:[ToggableComponent]
})
export class SharedModule { }
