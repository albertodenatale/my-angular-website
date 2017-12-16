import { Experience } from './experience';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDateFrom'
})
export class SortByDateFromPipe implements PipeTransform {

  transform(history: Array<Experience>, args?: any): any {
    return history.sort((a:Experience, b:Experience) => 
    {
      if(a.period.from < b.period.from){
        return 1;
      }
      else if(a.period.from == b.period.from){
        return 0;
      }
      else if(a.period.from > b.period.from){
        return -1;
      }

      throw new Error("Ouch!");
    });
  }

}
