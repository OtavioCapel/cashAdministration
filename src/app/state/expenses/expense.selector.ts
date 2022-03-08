import { createSelector } from "@ngrx/store";
import { AppState } from "..";


export const ExpenseSelector = (state: AppState) => state.expenses;

export const ExpenseTotalValue = createSelector(
    ExpenseSelector,
    (state: any) => {
        if(!state) return;
        return state.reduce((acumulator, prevValue) => {
            return acumulator +  Number(prevValue.value);
        }, 0)
    }
)

export const ExpenseExpireTotalValue = createSelector(
    ExpenseSelector,
    (state: any) => {
        if(!state) return;
        return state.filter(expense => !expense.paid).reduce((acumulator, prevValue) => {
            return acumulator +  Number(prevValue.value);
        }, 0)
    }
)

export const ExpensePaidTotalValue = createSelector(
    ExpenseSelector,
    (state: any) => {
        if(!state) return;
        return state.filter(expense => expense.paid).reduce((acumulator, prevValue) => {
            return acumulator +  Number(prevValue.value);
        }, 0)
    }
)