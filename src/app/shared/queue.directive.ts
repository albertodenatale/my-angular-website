import { ToggableComponent } from './toggable.component';
import { TagService } from './../core/tag.service';
import { Tags, Action } from '../core/tags';
import { Directive, Input, ViewChildren, QueryList, ContentChildren } from '@angular/core';
import { Node } from '../navigation/navigation';

@Directive({
  selector: '[queue], queue'
})
export class QueueDirective {

  @Input()
  source: Array<Node>

  @Input()
  queue:Array<Node>

  @ContentChildren(ToggableComponent)
  toggables: QueryList<ToggableComponent>;

  constructor(private tagService: TagService) {
    this.tagService.tagSource.subscribe(
      (t: Tags) => {
        let selected: Node = this.source.find(n => {
          let intersection = t.tags.filter(r => n.path.indexOf(r) > -1);

          return intersection.length == n.path.length &&  intersection.length == t.tags.length;
        });

        if (selected) {
          this.addToQueueWithIncrementalDelay([selected], t.action);
          if(this.queue) this.queue.push(selected);
        }
      }
    )
  }

  private addToQueueWithIncrementalDelay(subnav: Node[], action: Action) {
    //let interval: number = action == Action.Add ? 200 : 200 * subnav.length;

    subnav.forEach(t => this.toggables.map( list => this.toggle(list, t)));

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

  private toggle(list: ToggableComponent, node: Node) {
    //this.queue.push(node);
    let selected = list.id === node.key;

    if (selected) {
      list.isOn = true;
    }
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
