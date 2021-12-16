import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';
import { formatDate } from '../utils';

@Pipe({
  name: 'paymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

  transform(value: boolean, args?): string {

    let expireDays: number;

    if(value) return 'Pago'

    if(args) {     
      if(args.expireDate) {
        const end = moment(args.expireDate).format('YYYY-MM-DD');
        const start = moment(new Date()).format('YYYY-MM-DD');
        expireDays = moment(end).diff(start, 'days');
      } 

      return this.formatStatusString(expireDays)
    }

  }

  formatStatusString(restDays): string {
    if(restDays === 0) {
      return  `Vence hoje`
    }

    if(restDays === 1) {
      return  `Vence amanhã`
    }

    if (restDays < 0) {
      // Math.abs() convert negative number to positive number
      // only to remove '-' simbol
      restDays = Math.abs(restDays)
      return  `Venceu faz ${restDays} dia${restDays > 1 ? 's' : ''}`
    }
    
    if (restDays > 1) {
      return `Vencimento em ${restDays} dia${restDays > 1 ? 's' : ''}`
    }
  }

}
