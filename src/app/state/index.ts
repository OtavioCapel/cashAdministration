import { ActionReducerMap } from "@ngrx/store";
import { Expense } from "../expenses/models/expenses.model";
import { MovieEffects } from "./expenses/expense.effects";
import { ExpenseReducer } from "./expenses/expense.reducer";


export interface AppState {
    expenses: Expense[]
}

export const reducers: ActionReducerMap<AppState> = {
    expenses: ExpenseReducer
}

export const effects: Array<any> = [
    MovieEffects
]
