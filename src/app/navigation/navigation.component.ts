import { OfToggablesDirective } from './../shared/of-toggables.directive';
import { ToggableService } from 'app/core/toggable.service';
import { TagService } from './../core/tag.service';
import { Tags, Action } from '../core/tags';
import { NavigationService } from './navigation.service';
import { Node } from './navigation';
import { Component, OnInit, trigger, state, style, transition, animate, ViewChild } from '@angular/core';
import { Subject } from "rxjs/Rx";
import { QueueDirective } from "app/shared/queue.directive";

@Component({
  selector: 'navigation',
  template: `
      <!--<button class="btn btn-primary pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i></button> -->
        <queue ofToggables [source]="navs">
          <toggable *ngFor="let nav of navs" [id]="nav.key" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
        </queue>
      <subnavigation></subnavigation>
     <!--< <div class="input-group">
        <input type="text" name="search" class="form-control" placeholder="keywords">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </span>
      </div>-->`
})
export class NavigationComponent implements OnInit {

  navs: Array<Node>;
  
  @ViewChild(QueueDirective) queueDirective: QueueDirective;

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.navs = this.navigationService.getNavNodes();
  }

  ngAfterViewInit() {
     this.queueDirective.connect();
  }

  whenOn(node: Node) {
    let tags = node.path.slice();

    this.queueDirective.produce(
      <Tags>{
        action: Action.Add,
        tags: tags
      }
    );
  }

  whenOff(node: Node) {
    this.queueDirective.produce(
      <Tags>{
        action: Action.Remove,
        tags: node.path
      }
    );
  }

}
