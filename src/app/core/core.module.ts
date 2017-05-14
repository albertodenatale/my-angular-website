import { TagService } from './tag.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[TagService],
  declarations: []
})
export class CoreModule { }
