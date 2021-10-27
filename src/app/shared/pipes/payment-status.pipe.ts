import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'paymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

  transform(value: boolean, args?): string {
    
    let status;
    let restDays = 0;

    if(args) {
      
      const start = moment(new Date());
      const end = moment(args);
      restDays = end.diff(start, 'days');
      
      if(!value) {
        status = this.verifyDates(args, restDays)
      }
    }

    return value ? 'Pago' : status;
  }

  verifyDates(date, restDays): string {
 
    if(restDays === 0) {
      return  `Venceu hoje`
    }

    if (moment(new Date()).isAfter(date)) {
      // Math.abs() convert negative number to positive number
      // only to remove '-' simbol
      return  `Venceu faz ${Math.abs(restDays)} dia${restDays > 1 ? 's' : ''}`
    }
    else {
      return `Vencimento em ${restDays} dia${restDays > 1 ? 's' : ''}`
    }
  }

}
