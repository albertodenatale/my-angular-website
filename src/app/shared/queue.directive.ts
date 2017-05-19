import { TagService } from './../core/tag.service';
import { Tags, Action } from '../core/tags';
import { Directive, Input } from '@angular/core';
import { Node } from '../navigation/navigation';

@Directive({
  selector: '[queue], queue'
})
export class QueueDirective {

  @Input()
  source:Array<Node>

  @Input()
  queue: Array<Node>;

  constructor(private tagService: TagService) {
    this.tagService.tagSource.subscribe(
      (t: Tags) => {
        let selected: Node[] = this.source.filter(n => n.requires.filter(r => t.tags.indexOf(r)>-1).length > 0 );

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
