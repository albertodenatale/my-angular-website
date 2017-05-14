import { SharedModule } from './../shared/shared.module';
import { SearchComponent } from './search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [SearchComponent,],
  exports: [SearchComponent]
})
export class SearchModule { }
