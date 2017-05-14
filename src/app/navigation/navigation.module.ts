import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './navigation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [NavigationComponent,],
  exports: [NavigationComponent]
})
export class NavigationModule { }
