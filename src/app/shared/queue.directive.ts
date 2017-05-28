import { ToggableDirective } from './toggable.directive';
import { TagService } from './../core/tag.service';
import { Tags, Action } from '../core/tags';
import { Directive, Input, ViewChildren, QueryList, ContentChildren, ChangeDetectorRef } from '@angular/core';
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

  @ContentChildren(ToggableDirective)
  toggables: QueryList<ToggableDirective>;

  constructor(private tagService: TagService, private changeDetectionRef: ChangeDetectorRef) {
    this.tagService.tagSource.subscribe(
      (t: Tags) => {
        let selected: Node = this.source.find(n => {
          let intersection = t.tags.filter(r => n.path.indexOf(r) > -1);

          return intersection.length == n.path.length && intersection.length == t.tags.length;
        });

        let parent: Node = this.source.find(n => {
          let intersection = t.tags.filter(r => n.path.indexOf(r) > -1);

          return intersection.length != t.tags.length && intersection.length == n.path.length;
        });

        let addedPaths: Node[] = this.source.filter(n => {
          let intersection = t.tags.filter(r => n.path.indexOf(r) > -1);

          return intersection.length > 0;
        });

        if (addedPaths && this.queue) {
          let toRemove: Node[] = addedPaths.filter(a => this.queue.find(q => q.key == a.key) != null);
          let toAdd: Node[] = addedPaths.filter(a => this.queue.find(q => q.id == a.id) == null);
          if (selected == null || toRemove.length === 0) {
            if (toAdd) {
              this.addPaths(toAdd);
            }

            if (toRemove) {
              this.removePaths(toRemove);
            }
          }
        }

        if (selected) {
          this.tryToggleOrCreate([selected], t.action);
        }

        if (parent) {
          let directive: ToggableDirective = this.toggables.find(t => t.id == parent.key && !t.isOn);

          if (directive) {
            directive.toggleState();
          }
        }
      }
    )
  }

  private addPaths(leafs: Node[]) {
    leafs.forEach(l => {
      this.create(l);
    });
  }

  private removePaths(leafs: Node[]) {
    leafs.forEach(l => {
      this.remove(l);
    });
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

  private create(node: Node) {
    if (this.queue) this.queue.push(node);
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

  private remove(node: Node) {
    let index = this.queue.indexOf(node);

    if (index >= 0) {
      this.queue.splice(index, 1);
    }
  }
}
