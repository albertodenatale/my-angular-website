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

  @Output()
  newNode: EventEmitter<Tags> = new EventEmitter<Tags>()

  output: Subject<Tags>;

  constructor(private tagService: TagService) { }

  connect() {
    let reply: Subject<Subject<Tags>> = new Subject<Subject<Tags>>();
    let replySubscription = reply.asObservable().subscribe(
      (subject: Subject<Tags>) => {
        subject.subscribe(
          (t: Tags) => {
            this.newNode.emit(t);
          });
      });

    this.output = this.tagService.connect(reply);

    this.tagService.sources.subscribe(
      (subjects: [Subject<Tags>, Subject<Subject<Tags>>]) => {
        subjects[0].subscribe(
          (t: Tags) => {
            this.newNode.emit(t);
          });

        subjects[1].next(this.output);
      }
    );
  }

  public produce(tag: Tags) {
    this.output.next(tag);
    this.newNode.emit(tag);
  }
}
