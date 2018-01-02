import { Add, Remove } from './../reducers/actions';
import { findSkill } from 'app/shared/skilltree';
import { Skill } from 'app/shared/skilltree';
import { AppState } from 'app/shared/skilltree';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'education',
  template: `
  <div *ngFor="let education of educations" class="row">
    <div class="col-3 first">
      <strong>{{education.duration}}</strong>
    </div>
    <div class="col second">
      <h5>{{education.title}}</h5>
      <toggable *ngFor="let nav of education.navs" [isOn]="nav.isActive" class="btn-sm" (whenOff)="whenOff(nav)" (whenOn)="whenOn(nav)">{{nav.label}}</toggable>
      <div>{{education.place}}</div>
    </div>
  </div>
  `
})
export class EducationComponent {
  
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select<AppState>(state => state).subscribe(
      state => {
        this.educations.forEach(
          education =>{
            education.navs = [];
            education.path.forEach(skillId => {
              let skill: Skill = findSkill(state.navigation, skillId);
              
              if(skill){
                education.navs.push(skill);
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

  private educations = [
    {
      duration:"August 2010-December 2010",
      title:"Semester Abroad",
      place:"Universidade Estadual de Campinas, Campinas (Brazil)",
      path:["probability", "statistic", "stochasticp"],
      navs:[]
    },
    {
      duration:"March 2009 - February 2012",
      title:"Master's Degree in Computer Science (2012)",
      place:"Politecnico di Milano, Milan (Italy)",
      path:["artificial", "machinel", "vision", "naturall", "videogame"],
      navs:[]
    },
    {
      duration:"September 2005 February 2009",
      title:"Bachelor's Degree in Computer Science (2009)",
      place:"Politecnico di Milano, Milan (Italy)",
      path:["math", "physic", "IT", "economy", "networks", "automation", "electronic", "chemistry"],
      navs:[]
    }
  ]

}
