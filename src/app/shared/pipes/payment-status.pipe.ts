import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';
import { Expense } from 'src/app/expenses/models/expenses.model';
import { formatDate } from '../utils';

@Pipe({
  name: 'paymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

  transform(value: boolean, args?): string {

    let status;
    let expireStatus = 0;
    let expense;

    if(args) {     
      expense = Object.assign({}, args);

      if(expense.expireDate && expense.expireDate.seconds) {
        expense.expireDate = expense.expireDate.toDate()
        const end = moment(expense.expireDate);
        const start = moment(new Date());
        expireStatus = end.diff(start, 'days');
      } 
  
      if(!value) {
        status = this.verifyDates(args.expireDate, expireStatus)
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
