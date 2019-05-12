import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'appMoment'
})
export class MomentPipe implements PipeTransform {

  transform(value: string, format: string, template: string = 'DD.MM.YYYY'): any {
    return moment(value, format).format(template);
  }
}
