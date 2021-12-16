import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Expense } from 'src/app/expenses/models/expenses.model';
import { formatDate } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  expenseCollection: AngularFirestoreCollection<Expense> = this.database.collection('Expenses');

  constructor(
    private database: AngularFirestore,
  ) { }

  addExpense(expense: Expense) {
    const _id = this.database.createId()
    const _expense = { ...expense, _id };
    return from(this.expenseCollection.doc(_id).set(_expense));
  }

  getExpenses(): Observable<Expense[]> {
    return from(this.expenseCollection.valueChanges().pipe(
      switchMap(expense => this.formatTimestampToDate(expense))
    ))
  } 

  updateExpense(expense: Expense) {
    return from(this.expenseCollection.doc(expense._id).update(expense));
  }

  deleteExpense(_id: string) {
    return from(this.expenseCollection.doc(_id).delete());
  }

  filteredExpenses(condition: string): Observable<Expense[]> {

    let query$;

    switch(condition) {
      case 'paid':
        query$ = from(this.database.collection('Expenses', ref => 
        ref.where('paid', '==', true)).valueChanges())
        break;

      case 'expired':
        query$ = from(this.database.collection('Expenses', ref => 
        ref.where('expireDate', '<', new Date())).valueChanges().pipe(
          map((expense: Expense[]) => expense.filter(item => !item.paid))
        ))
        break;

      case 'not-paid':
        query$ = from(this.database.collection('Expenses', ref => 
        ref.where('paid', '!=', true)).valueChanges())
        break;
    }

      return query$.pipe(
        switchMap((expense: Expense[]) => this.formatTimestampToDate(expense))
      )
  }

  formatTimestampToDate(expenseArray: Expense[]) {
    expenseArray.map((item: any) => {
      if (item.expireDate) item.expireDate = formatDate(item.expireDate)
      if (item.paymentDate) item.paymentDate = formatDate(item.paymentDate)  
    })
    return of(expenseArray)
  }
}
