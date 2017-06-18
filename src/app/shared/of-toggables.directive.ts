import { QueueDirective } from './queue.directive';
import { Subscription } from 'rxjs/Rx';
import { Directive, Input, ChangeDetectorRef, ContentChildren, QueryList, Host } from '@angular/core';
import { Tags } from "app/core/tags";
import { Action } from '../core/tags';
import { ToggableDirective } from "app/shared/toggable.directive";
import { Node } from '../navigation/navigation';

@Directive({
  selector: 'ofToggables, [ofToggables]'
})
export class OfToggablesDirective {

  @Input()
  source: Array<Node>

  @Input()
  queue: Array<Node>

  @ContentChildren(ToggableDirective)
  toggables: QueryList<ToggableDirective>;

  constructor( @Host() private queueDirective: QueueDirective, private changeDetectionRef: ChangeDetectorRef) {
    queueDirective.newNode.subscribe(
      (t: Tags) => {
        this.subscriptions.forEach(s => s.unsubscribe());
        this.handleToggling(t);
      }
    )
  }

  public handleToggling(t: Tags) {
    let selected: Node[];

    if (t.action === Action.Add) {
      selected = this.source.filter(n => {
        let intersection = t.tags.filter(r => n.path.indexOf(r) > -1);

        return intersection.length === n.path.length && (intersection.length === t.tags.length || intersection.length > 0 && n.path.length < t.tags.length);
      });
    }
    else if (t.action === Action.Remove) {
      selected = this.source.filter(n => {
        let intersection = t.tags.filter(r => n.path.indexOf(r) > -1);

        return intersection.length === t.tags.length;
      });
    }

    if (selected) {
      this.tryToggleOrCreate(selected, t);
    }
  }

  subscriptions: Array<Subscription> = new Array<Subscription>();

  private tryToggleOrCreate(nodes: Node[], tag: Tags) {
    //let interval: number = action == Action.Add ? 200 : 200 * subnav.length;
    nodes.forEach(node => {
      let existsAndToggled: boolean = this.tryToggle(this.toggables, node, tag);

      if (!existsAndToggled) {
        this.waitCreationAndToggle(node, tag);
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

  private waitCreationAndToggle(node: Node, tag: Tags) {
    this.subscriptions.push(this.toggables.changes.subscribe(list => {
      if (this.tryToggle(list, node, tag)) {
        this.changeDetectionRef.detectChanges();
      }
    }));
  }

  private tryToggle(list: QueryList<ToggableDirective>, node: Node, tag: Tags): boolean {
    let selected: ToggableDirective = this.toggables.find(t => t.id === node.key);

    if (selected && (selected.isOff && tag.action === Action.Add || selected.isOn && tag.action === Action.Remove)) {
      selected.toggleState();

      return true;
    }

    return false;
  }
}
