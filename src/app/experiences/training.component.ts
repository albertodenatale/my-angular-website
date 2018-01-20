import { Add, Remove } from './../reducers/actions';
import { findSkill } from 'app/shared/skilltree';
import { Skill } from 'app/shared/skilltree';
import { AppState } from 'app/shared/skilltree';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'training',
  template: `
    <div *ngFor="let training of trainings" class="row">
      <div class="col-12 col-lg-9 push-lg-3 col second">
        <h5>{{training.title}}</h5>
      </div>
      <div class="col-12 col-lg-3 pull-lg-9 first">
        <strong>{{training.duration}}</strong>
      </div>
      <div class="col-12 col-lg-9 push-lg-3 col second">
        <toggable *ngFor="let nav of training.navs" [isOn]="nav.isActive" class="btn-sm" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
        <div>{{training.place}}</div>
      </div>
    </div>
  `
})
export class TrainingComponent {
  
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select<AppState>(state => state).subscribe(
      state => {
        this.trainings.forEach(
          training =>{
            training.navs = [];
            training.path.forEach(skillId => {
              let skill: Skill = findSkill(state.navigation, skillId);
              
              if(skill){
                training.navs.push(skill);
              }
            });
          }
        );
      }
    );
  }

  whenOn(skill: Skill) {
    this.store.dispatch(
      new Add(skill.id)
    )
  }

  whenOff(skill: Skill) {
    this.store.dispatch(
      new Remove(skill.id)
    )
  }

  trainings = [
    {
      duration:"October 2013 – December 2013",
      title:".NET Advanced Applications Development Using C#",
      place:"City University, London (UK)",
      path:["backend", "wpf", "csharp"],
      navs:[]
    },
    {
      duration:"October 2013 – December 2013",
      title:"ASP.NET: Web Applications with MVC and Entity Frameworks Using C#",
      place:"City University, London (UK)",
      path:["backend", "mvc", "csharp", "ef"],
      navs:[]
    },
    {
      duration:"18th November 2013",
      title:"Java SE 7 Certified Programmer I (Exam 1Z0-803)",
      place:"London",
      path:["java"],
      navs:[]
    }
  ]

}
