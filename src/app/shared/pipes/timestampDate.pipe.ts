
import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';
import { formatDate } from '../utils';

@Pipe({
  name: 'timestampDate'
})
export class TimestampDatePipe implements PipeTransform {

  transform(value: any, args?) {
    return formatDate(value);

  }

}
