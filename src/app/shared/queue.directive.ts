import { Subject } from 'rxjs/Subject';
import { Tags } from 'app/core/tags';
import { ToggableDirective } from './toggable.directive';
import { TagService } from './../core/tag.service';
import { Action } from '../core/tags';
import { Directive, Input, ViewChildren, QueryList, ContentChildren, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Node } from '../navigation/navigation';
import { Subscription } from "rxjs/Rx";

@Directive({
  selector: 'queue'
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

  output: Subject<Tags>;

  constructor(private tagService: TagService, private changeDetectionRef: ChangeDetectorRef) {

  }

  connect() {
    let reply: Subject<Subject<Tags>> = new Subject<Subject<Tags>>();
    let replySubscription = reply.asObservable().subscribe(
      (subject: Subject<Tags>) => {
        subject.subscribe(
          (t: Tags) => {
            this.handleToggling(t);
          });
      });

    this.output = this.tagService.connect(reply);

    this.tagService.sources.subscribe(
      (subjects: [Subject<Tags>, Subject<Subject<Tags>>]) => {
        subjects[0].subscribe(
          (t: Tags) => {
            this.handleToggling(t);

            this.newNode.emit(t);
          });

        subjects[1].next(this.output);
      }
    );
  }

  public produce(tag: Tags) {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.output.next(tag);
    this.handleToggling(tag);
  }

  public handleToggling(t: Tags) {
    let selected: Node[];

    if (t.action === Action.Add) {
      selected = this.source.filter(n => {
        let intersection = t.tags.filter(r => n.path.indexOf(r) > -1);
        
        return intersection.length === n.path.length  && (intersection.length === t.tags.length || intersection.length > 0 && n.path.length < t.tags.length);
      });
    }
    else if(t.action === Action.Remove){
      selected = this.source.filter(n => {
        let intersection = t.tags.filter(r => n.path.indexOf(r) > -1);

        return intersection.length === t.tags.length;
      });
    }

    if (selected) {
      this.tryToggleOrCreate(selected, t);
    }

    this.newNode.emit(t);
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
