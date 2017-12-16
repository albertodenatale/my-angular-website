import { Pipe, PipeTransform } from '@angular/core';
import { Period, formatPeriod, Experience } from "app/experiences/experience";
import * as moment from 'moment';

@Pipe({
  name: 'period'
})
export class PeriodPipe implements PipeTransform {

  transform(experience: Experience, args?: any): string {
    return formatPeriod(experience.period);
  }

}
