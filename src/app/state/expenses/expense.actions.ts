import { Action } from "@ngrx/store";
import { Expense } from "src/app/expenses/models/expenses.model";

export enum ExpensesActionTypes {
    GET_EXPENSES = '[EXPENSES] Get all',
    GET_EXPENSES_SUCCESS = '[EXPENSES] Get all success',
    GET_EXPENSES_ERROR = '[EXPENSES] Get all error',

    CREATE_EXPENSE = '[EXPENSES] Add new',
    UPDATE_EXPENSE = '[EXPENSES] Update',

    DELETE_EXPENSE = '[EXPENSES] Delete',
    DELETE_EXPENSE_SUCCESS = '[EXPENSES] Delete expense success',
    DELETE_EXPENSE_ERROR = '[EXPENSES] Delete expense error',
}

export class GetExpenses implements Action {
    readonly type = ExpensesActionTypes.GET_EXPENSES;
}

export class GetExpensesSuccess implements Action {
    readonly type = ExpensesActionTypes.GET_EXPENSES_SUCCESS;
    constructor(public payload: Expense[]) {}
}

export class AddExpense implements Action {
    readonly type = ExpensesActionTypes.CREATE_EXPENSE;
    constructor(public payload: Expense) {};
}

export class UpdateExpense implements Action {
    readonly type = ExpensesActionTypes.UPDATE_EXPENSE;
    constructor(public payload: Expense) {};
}

export class DeleteExpense implements Action {
    readonly type = ExpensesActionTypes.DELETE_EXPENSE;
    constructor(public payload: Expense) {};
}

export class DeleteExpenseSuccess implements Action {
    readonly type = ExpensesActionTypes.DELETE_EXPENSE_SUCCESS;
    constructor(public payload: Expense) {};
}

export class DeleteExpenseError implements Action {
    readonly type = ExpensesActionTypes.DELETE_EXPENSE_ERROR;
    constructor(public payload: Expense) {};
}

export type ExpensesActions = 
AddExpense | 
UpdateExpense | 
DeleteExpense |
GetExpenses |
GetExpensesSuccess |
DeleteExpenseSuccess | 
DeleteExpenseError

