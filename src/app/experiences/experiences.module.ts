import { ExperienceService } from './experience.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience.component';
import { HistoryComponent } from './history.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ExperienceComponent, HistoryComponent],
  providers:[ExperienceService],
  exports:[HistoryComponent]
})
export class ExperiencesModule { }