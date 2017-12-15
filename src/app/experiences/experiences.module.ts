import { EditingModule } from './../editing/editing.module';
import { SharedModule } from './../shared/shared.module';
import { ExperienceService } from './experience.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience.component';
import { HistoryComponent } from './history.component';
import { PeriodPipe } from './period.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    EditingModule
  ],
  declarations: [ExperienceComponent, HistoryComponent, PeriodPipe],
  providers:[ExperienceService],
  exports:[HistoryComponent]
})
export class ExperiencesModule { }
