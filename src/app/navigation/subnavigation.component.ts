import { TagService } from './../core/tag.service';
import { Tag } from './../core/tag';
import { NavigationService } from './navigation.service';
import { Component, OnInit } from '@angular/core';
import { Node } from './navigation';

@Component({
  selector: 'subnavigation',
  template:`
    <toggable *ngFor="let nav of nav">{{nav.label}}</toggable>
  `
})
export class SubnavigationComponent implements OnInit {

  navs:{ [key:string]: Array<Node> };
  nav:Array<Node> = new Array<Node>();

  constructor(private navigationService:NavigationService, private tagService:TagService) { }

  ngOnInit() {
    this.navs = this.navigationService.getSubnavNodes();

    this.tagService.tagSource.subscribe(
      (t:Tag) => {
        let selected = this.navs[t.tag];
        if(selected){
          if(t.action=="add"){
            this.nav=this.nav.concat(selected);
          }
          else if(t.action=="remove"){
            selected.forEach(
              t =>{
                let index = this.nav.indexOf(t);

                if(index>=0){
                  this.nav.splice(index, 1);
                }
              }
            )
          }
        }
      }
    )
  }

}
