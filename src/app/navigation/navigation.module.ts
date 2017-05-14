import { NavigationService } from './navigation.service';
import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './navigation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubnavigationComponent } from './subnavigation.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [NavigationComponent, SubnavigationComponent],
  exports: [NavigationComponent, SubnavigationComponent],
  providers:[NavigationService]
})
export class NavigationModule { }
