import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './navigation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubnavigationComponent } from './subnavigation.component';
import { AnimationService } from "app/navigation/animation.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [NavigationComponent, SubnavigationComponent],
  exports: [NavigationComponent, SubnavigationComponent],
  providers:[AnimationService]
})
export class NavigationModule { }
