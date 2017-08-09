import { StateService } from './state.service';
import { TagService } from './tag.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineComponent } from './line.component';
import { PersonalDetailsComponent } from './personal-details.component';
import { ToggableService } from "app/core/toggable.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[TagService, ToggableService, StateService],
  declarations: [LineComponent, PersonalDetailsComponent],
  exports:[LineComponent, PersonalDetailsComponent]
})
export class CoreModule { }
