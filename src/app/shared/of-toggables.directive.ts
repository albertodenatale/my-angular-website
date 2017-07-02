import { TagService } from 'app/core/tag.service';
import { Subject } from 'rxjs/Subject';
import { QueueDirective } from './queue.directive';
import { Subscription } from 'rxjs/Rx';
import { Directive, Input, ChangeDetectorRef, ContentChildren, QueryList, Host, NgZone } from '@angular/core';
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

  subscriptions: Array<Subscription> = new Array<Subscription>();

  newNodeSubscription: Subscription

  constructor( @Host() private queueDirective: QueueDirective, private changeDetectionRef: ChangeDetectorRef, private tagService: TagService, private zoneService: NgZone) {
    this.newNodeSubscription = queueDirective.newNode.subscribe(
      (t: Tags) => {
        this.cleanSubscriptions();
        this.handleToggling(t);
      }
    )
  }

  public handleToggling(t: Tags) {
    let selected: Node[];

    if (t.action === Action.Add) {
      selected = this.getNodesToBeAdded(t);
    }
    else if (t.action === Action.Remove) {
      selected = this.getNodeToBeRemoved(t);
    }

    if (selected) {
      this.tryToggleOrCreate(selected, t);
    }
  }

  getNodesToBeAdded(t: Tags): Node[] {
    return this.source.filter(n => {
      let intersection = t.tags.filter(r => n.path.indexOf(r) > -1);

      return intersection.length === n.path.length && (intersection.length === t.tags.length || intersection.length > 0 && n.path.length < t.tags.length);
    });
  }

  getNodeToBeRemoved(t: Tags): Node[] {
    return this.source.filter(n => {
      let intersection = t.tags.filter(r => n.path.indexOf(r) > -1);

      return intersection.length === t.tags.length;
    });
  }

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

  ngOnDestroy() {
    this.toggables.forEach(element => {
      element.isOn = false;
    });
    this.newNodeSubscription.unsubscribe();
    this.outToggleSubscription.unsubscribe();
    this.toggleSubscription.unsubscribe();
    if(this.zoneSubscription){
      this.zoneSubscription.unsubscribe();
    }
    this.cleanSubscriptions();
  }

  cleanSubscriptions() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions.length = 0;
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

  inputs: Array<Subject<Node>> = [];
  zoneSubscription: Subscription;
  toggleSubscription = new Subscription();
  outToggleSubscription = new Subscription();

  ngOnInit() {
    this.zoneSubscription = this.zoneService.onStable.subscribe((a) => {
      this.zoneSubscription.unsubscribe();
      this.sync();
    })
  }

  public sync() {
    let helloAnswers = new Subject<Node>();

    if (this.toggleSubscription) {
      this.toggleSubscription.unsubscribe();
    }

    this.toggleSubscription = helloAnswers.subscribe((node: Node) => {
      if (this.toggables) {
        let toggable = this.toggables.find(n => n.id === node.key);

        if (toggable && toggable.isOff) {
          this.zoneService.run(() => toggable.toggleState());
        }
      }
    });

    this.tagService.sync(helloAnswers);

    if (this.outToggleSubscription) {
      this.outToggleSubscription.unsubscribe();
    }

    this.outToggleSubscription = this.tagService.syncSource.subscribe(
      (out) => {
        if (this.toggables) {
          let actives = this.toggables.filter(t => t.isOn);

          actives.forEach(a => {
            out.next(this.source.find(n => n.key === a.id));
          });
        }
      }
    )
  }
}
