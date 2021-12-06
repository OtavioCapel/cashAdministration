import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { from, Observable, of, pipe } from 'rxjs';
import { map, catchError, switchMap, tap, take } from 'rxjs/operators';
import { Expense } from 'src/app/expenses/models/expenses.model';
import { ActionModel } from 'src/app/shared/models/action.model';

import { ExpenseService } from 'src/app/shared/services/expense.service';
import { AppState } from '..';
import { ExpensesActionTypes, GetExpenses, GetExpensesSuccess } from './expense.actions';
 
@Injectable()
export class ExpenseEffects {
 
  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private expenseService: ExpenseService
  ) {}


  loadExpenses$ = createEffect(() => 
  this.actions$.pipe(
    ofType(ExpensesActionTypes.GET_EXPENSES),
    switchMap(() => this.expenseService.getExpenses().pipe(
        switchMap((expenses: Expense[]) => {
          return [new GetExpensesSuccess(expenses)]
        }),
        catchError((e) => {
          return [e]
        })
      )
    ),
  )) 

  updateExpense$ = createEffect(() => 
  this.actions$.pipe(
    ofType(ExpensesActionTypes.UPDATE_EXPENSE),
    switchMap((action: ActionModel) => this.expenseService.updateExpense(action.payload).pipe(
        switchMap(() => {
          return [new GetExpenses()]
        }),
        catchError((e) => {
          return [e]
        })
      )
    ),
  )) 

  setExpenses$ = createEffect(() => 
  this.actions$.pipe(
    ofType(ExpensesActionTypes.CREATE_EXPENSE),
    switchMap((action: ActionModel) => 
      this.expenseService.addExpense(action.payload).pipe(
        switchMap(() => [new GetExpenses()])
      )
    )
  )) 


  deleteExpenses$ = createEffect(() => 
  this.actions$.pipe(
    ofType(ExpensesActionTypes.DELETE_EXPENSE),
    switchMap((action: ActionModel) => this.expenseService.deleteExpense(action.payload._id)
      .pipe(
        switchMap(() => [new GetExpenses()])
      )
    )
  )) 

}