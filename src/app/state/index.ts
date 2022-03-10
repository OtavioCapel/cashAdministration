import { Expense } from "../expenses/models/expenses.model";
import { ExpenseEffects } from "./expenses/expense.effects";


export interface AppState {
    expenses: Expense[],
    loading: boolean
}

export const initialState: AppState = {
    expenses: [],
    loading: false
}

export const effects: Array<any> = [
    ExpenseEffects
]

