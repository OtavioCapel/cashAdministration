import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
    return this.expenseCollection.valueChanges().pipe(
      map(expense => {
        expense.map((item: any) => {
          item.expireDate = formatDate(item.expireDate.seconds * 1000)
          if(item.paymentDate) item.paymentDate = formatDate(item.paymentDate.seconds * 1000)  
        })
        return expense
      })
    )
  } 

  updateExpense(expense: Expense) {
    return from(this.expenseCollection.doc(expense._id).update(expense));
  }

  deleteExpense(_id: string) {
    return from(this.expenseCollection.doc(_id).delete());
  }

  getExpenseById(id: string) {

  }

  filteredExpenses(attribute: string, condition, value: any) {
    return this.database.collection('Expenses', ref => 
    ref.where(attribute, condition, value)).valueChanges();
  }
}
