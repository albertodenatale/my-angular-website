import { AppState } from 'app/shared/skilltree';
import { Store } from '@ngrx/store';
import { EditService } from './../core/edit.service';
import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[editable]'
})
export class EditableDirective {

  constructor(private editService: EditService, private store: Store<AppState>) { }

  ngOnInit()
  {
    this.store.select<any>(state => state.authentication).subscribe(
      auth => {
        if (auth != null) {
          this.isEditable = true;
        }
        else{
          this.isEditable = false;
        }
      }
    );
  }

  @HostListener('mousemove', ['$event']) onMousemove(e: MouseEvent) {
    if(this.isEditable){
      var x = e.clientX + 10, y = e.clientY - 20;
      this.editService.setNewPosition(x + 'px', y + 'px');
    }
  }

  @HostListener('mouseout') onMouseOut() {
    this.editService.hide();
  }

  @HostBinding('attr.contenteditable') isEditable: boolean
}
