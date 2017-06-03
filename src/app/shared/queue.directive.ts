import { Tags } from 'app/core/tags';
import { ToggableDirective } from './toggable.directive';
import { TagService } from './../core/tag.service';
import { Action } from '../core/tags';
import { Directive, Input, ViewChildren, QueryList, ContentChildren, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Node } from '../navigation/navigation';
import { Subscription } from "rxjs/Rx";

@Directive({
  selector: '[queue], queue'
})
export class QueueDirective {

  @Input()
  source: Array<Node>

  @Input()
  queue: Array<Node>

  @Output()
  newNode: EventEmitter<Tags> = new EventEmitter<Tags>()

  @ContentChildren(ToggableDirective)
  toggables: QueryList<ToggableDirective>;

  constructor(private tagService: TagService, private changeDetectionRef: ChangeDetectorRef) {
    this.tagService.tagSource.subscribe(
      (t: Tags) => {
        this.handleToggling(t);

        this.newNode.emit(t);
      }
    )
  }

  private handleToggling(t: Tags) {
    let selected: Node = this.source.find(n => {
      let intersection = t.tags.filter(r => n.path.indexOf(r) > -1);

      return intersection.length == n.path.length && intersection.length == t.tags.length;
    });

    if (selected) {
      this.tryToggleOrCreate([selected], t.action);
    }
  }

  subscriptions: Array<Subscription> = new Array<Subscription>();

  private tryToggleOrCreate(subnav: Node[], action: Action) {
    //let interval: number = action == Action.Add ? 200 : 200 * subnav.length;

    this.subscriptions.forEach(s => s.unsubscribe());

    subnav.forEach(n => {
      let existsAndToggled: boolean = this.tryToggle(this.toggables, n);

      if (!existsAndToggled) {
        this.waitCreationAndToggle(n);
      }
    });

    //{
    //   setTimeout(() => {
    //     if (action == Action.Add) {
    //       this.add(t);
    //     }
    //     else if (action == Action.Remove) {
    //       this.remove(t)
    //     }
    //   }, interval);

    //   if (action == Action.Add) {
    //     interval += 200;
    //   }
    //   else {
    //     interval -= 200;
    //   }
    // }
  }

  private waitCreationAndToggle(t: Node) {
    this.subscriptions.push(this.toggables.changes.subscribe(list => {
      if (this.tryToggle(list, t)) {
        this.changeDetectionRef.detectChanges();
      }
    }));
  }

  private tryToggle(list: QueryList<ToggableDirective>, node: Node): boolean {
    let selected: ToggableDirective = this.toggables.find(t => t.id === node.key);

    if (selected) {
      selected.toggleState();

      return true;
    }

    return false;
  }
}
