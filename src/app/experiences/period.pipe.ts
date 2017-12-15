import { Pipe, PipeTransform } from '@angular/core';
import { Period, formatPeriod } from "app/experiences/experience";
import * as moment from 'moment';

@Pipe({
  name: 'period'
})
export class PeriodPipe implements PipeTransform {

  transform(period: Period, args?: any): string {
    return formatPeriod(period);
  }

}
