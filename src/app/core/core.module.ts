import { EditService } from './edit.service';
import { StateService } from './state.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineComponent } from './line.component';
import { PersonalDetailsComponent } from './personal-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[StateService, EditService],
  declarations: [LineComponent, PersonalDetailsComponent],
  exports:[LineComponent, PersonalDetailsComponent]
})
export class CoreModule { }
