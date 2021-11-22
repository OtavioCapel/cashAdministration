import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Expense } from 'src/app/expenses/models/expenses.model';

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

  getExpenses() {
    return from(this.expenseCollection.valueChanges())
  }

  updateExpense(expense: Expense) {
    return from(this.expenseCollection.doc(expense._id).update(expense));
  }

  deleteExpense(_id: string) {
    return from(this.expenseCollection.doc(_id).delete());
  }

  getExpenseById(id: string) {

  }
}
