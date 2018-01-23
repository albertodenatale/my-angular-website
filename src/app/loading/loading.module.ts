import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from './loading.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule 
  ],
  declarations: [LoaderComponent],
  exports:[LoaderComponent],
  providers:[LoadingService]
})
export class LoadingModule { }
