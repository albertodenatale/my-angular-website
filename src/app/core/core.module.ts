import { TagService } from './tag.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineComponent } from './line.component';
import { PersonalDetailsComponent } from './personal-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[TagService],
  declarations: [LineComponent, PersonalDetailsComponent],
  exports:[LineComponent, PersonalDetailsComponent]
})
export class CoreModule { }
