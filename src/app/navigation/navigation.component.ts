import { TagService } from './../core/tag.service';
import { Tags, Action } from '../core/tags';
import { NavigationService } from './navigation.service';
import { Node } from './navigation';
import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'navigation',
  template: `
      <!--<button class="btn btn-primary pdf" ><i class="fa fa-file-pdf-o" aria-hidden="true"></i></button> -->
      <toggable *ngFor="let nav of navs" (whenOff)="whenOff(nav.key)" (whenOn)="whenOn(nav.key)">{{nav.label}}</toggable>
      <subnavigation></subnavigation>
     <!--< <div class="input-group">
        <input type="text" name="search" class="form-control" placeholder="keywords">
        <span class="input-group-btn">
          <button class="btn btn-primary" type="button"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </span>
      </div>-->`
})
export class NavigationComponent implements OnInit {

  navs:Array<Node>;

  constructor(private navigationService: NavigationService, private tagService:TagService) { }

  ngOnInit() {
    this.navs = this.navigationService.getNavNodes();
  }

  whenOn(key:string){
    this.tagService.produce(
      <Tags>{
        action:Action.Add,
        tags:[key]
      }
    );
  }

  whenOff(key:string){
    this.tagService.produce(
      <Tags>{
        action:Action.Remove,
        tags:[key]
      }
    );
  }

}
