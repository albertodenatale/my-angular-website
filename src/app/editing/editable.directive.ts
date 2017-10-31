import { EditService } from './../core/edit.service';
import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[editable]'
})
export class EditableDirective {

  constructor(private editService: EditService) { }

  @HostListener('mousemove', ['$event']) onMousemove(e: MouseEvent) {
    var x = e.clientX + 10, y = e.clientY - 20;
    this.editService.setNewPosition(x + 'px', y + 'px');
  }

  @HostListener('mouseout') onMouseOut() {
    this.editService.hide();
  }
}
