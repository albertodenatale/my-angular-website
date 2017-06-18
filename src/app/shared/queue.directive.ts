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

  subscriptions: Array<Subscription> = new Array<Subscription>()

  constructor(private tagService: TagService) { }

  connect() {
    let reply: Subject<Subject<Tags>> = new Subject<Subject<Tags>>();
    this.subscribeToReplies(reply);
    this.output = this.tagService.connect(reply);
    this.subscribeToNewInputs();
  }

  public produce(tag: Tags) {
    this.output.next(tag);
    this.newNode.emit(tag);
  }

  reply(replyOutput: Subject<Subject<Tags>>) {
    replyOutput.next(this.output);
  }

  subscribeToReplies(replyInput: Subject<Subject<Tags>>) {
    let replySubscription = replyInput.asObservable().subscribe(
      (input: Subject<Tags>) => {
        this.registerToInput(input);
      });

    this.subscriptions.push(replySubscription);
  }

  registerToInput(input: Subject<Tags>) {
    let inputSubscription = input.subscribe(
      (t: Tags) => {
        this.newNode.emit(t);
      });

    this.subscriptions.push(inputSubscription);
  }

  subscribeToNewInputs(){
    let newInputSubscription = this.tagService.sources.subscribe(
      (subjects: [Subject<Tags>, Subject<Subject<Tags>>]) => {
        this.registerToInput(subjects[0]);
        this.reply(subjects[1]);
      }
    );

    this.subscriptions.push(newInputSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }
}
