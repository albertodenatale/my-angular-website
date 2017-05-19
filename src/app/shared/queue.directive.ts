import { TagService } from './../core/tag.service';
import { Tags, Action } from '../core/tags';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[queue], queue'
})
export class QueueDirective {

  @Input()
  data:any

  @Input()
  queue: Array<Node>;

  constructor(private tagService: TagService) {
    this.tagService.tagSource.subscribe(
      (t: Tags) => {
        let selected: Node[];

        if (t.tags.length == 1) {
          selected= this.data[t.tags[0]];
        }
        else{
          selected = this.data[t.tags[0]][t.tags[1]];
        }

        if (selected) {
          this.addToQueueWithIncrementalDelay(selected, t.action);
        }
      }
    )
  }

  private addToQueueWithIncrementalDelay(subnav: Node[], action: Action) {
    let interval: number = action == Action.Add ? 200 : 200 * subnav.length;

    subnav.forEach(
      t => {
        setTimeout(() => {
          if (action == Action.Add) {
            this.queue.push(t);
          }
          else if (action == Action.Remove) {
            this.remove(t)
          }
        }, interval);

        if (action == Action.Add) {
          interval += 200;
        }
        else {
          interval -= 200;
        }
      });
  }

  private remove(node: Node) {
    let index = this.queue.indexOf(node);

    if (index >= 0) {
      this.queue.splice(index, 1);
    }
  }
}
