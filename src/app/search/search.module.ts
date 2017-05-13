import { ToggableComponent } from './toggable.component';
import { SearchComponent } from './search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchComponent, ToggableComponent],
  exports: [SearchComponent]
})
export class SearchModule { }
