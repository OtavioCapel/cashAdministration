import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';
import { formatDate } from '../utils';

@Pipe({
  name: 'paymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

  transform(value: boolean, args?): string {

    let status;
    let expireStatus = 0;

    if(args) {     
      if(args.expireDate) {
        const end = args.expireDate;
        const start = new Date();
        expireStatus = moment(end).diff(start, 'days') + 1;
      } 
  
      if(!value) {
        status = this.verifyDates(formatDate(args.expireDate), expireStatus)
      }
    }

    return value ? 'Pago' : status;
  }

  verifyDates(date, restDays): string {
    // Math.abs() convert negative number to positive number
    // only to remove '-' simbol
    restDays = Math.abs(restDays)

    if(restDays === 0) {
      return  `Vence hoje`
    }

    if(restDays === 1) {
      return  `Vence amanhã`
    }

    if (moment(new Date()).isAfter(date)) {
      return  `Venceu faz ${restDays} dia${restDays > 1 ? 's' : ''}`
    }
    else {
      return `Vencimento em ${restDays} dia${restDays > 1 ? 's' : ''}`
    }
  }

}
