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

        if (selected) {
          this.addToQueueWithIncrementalDelay([selected], t.action);
          if (this.queue) this.queue.push(selected);
        }
      }
    )
  }

  subscriptions: Array<Subscription> = new Array<Subscription>();

  private addToQueueWithIncrementalDelay(subnav: Node[], action: Action) {
    //let interval: number = action == Action.Add ? 200 : 200 * subnav.length;

    this.subscriptions.forEach(s => s.unsubscribe());

    subnav.forEach(t => {
      if (this.toggle(this.toggables, t) === false) {
        this.tryWaitComponentToBeCreated(t);
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

  private tryWaitComponentToBeCreated(t:Node) {
    this.subscriptions.push(this.toggables.changes.subscribe(list => {
      this.toggle(list, t);
      this.changeDetectionRef.detectChanges();
    }));
  }

  private toggle(list: QueryList<ToggableDirective>, node: Node): boolean {
    //this.queue.push(node);
    let selected: ToggableDirective = this.toggables.find(t => t.id === node.key);

    if (selected == null) {
      return false;
    }

    selected.toggleState();

    return true;
  }

  ngAfterViewInit() {
    this.toggables.changes.subscribe(x => console.log(x));
  }

  // private remove(node: Node) {
  //   let index = this.queue.indexOf(node);

  //   if (index >= 0) {
  //     this.queue.splice(index, 1);
  //   }
  // }
}
