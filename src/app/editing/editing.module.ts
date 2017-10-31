import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditableDirective } from './editable.directive';
import { EditTooltipComponent } from './edit-tooltip.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EditableDirective, EditTooltipComponent],
  exports:[EditTooltipComponent, EditableDirective]
})
export class EditingModule { }
