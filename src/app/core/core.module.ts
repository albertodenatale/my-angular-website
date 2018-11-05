import { AnimationService } from '../core/animation.service';
import { QueryStringService } from './querystring.service';
import { EditService } from './edit.service';
import { StateService } from './state.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDetailsComponent } from './personal-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[StateService, EditService, QueryStringService, AnimationService],
  declarations: [PersonalDetailsComponent],
  exports:[PersonalDetailsComponent]
})
export class CoreModule { }
