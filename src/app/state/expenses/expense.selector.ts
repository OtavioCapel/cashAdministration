import { createSelector } from "@ngrx/store";
import { AppState } from "..";


export const StateSelector = (state: AppState) => state;

export const ExpensesValue = createSelector(
    StateSelector,
    (state: any) => {
        if(!state) return;
        return state.ExpenseReducer.expenses;
    }
)

export const ExpenseTotalValue = createSelector(
    StateSelector,
    (state: any) => {
        if(!state) return;
        return state.ExpenseReducer.expenses.reduce((acumulator, prevValue) => {
            return acumulator +  Number(prevValue.value);
        }, 0)
    }
)

export const ExpenseExpireTotalValue = createSelector(
    StateSelector,
    (state: any) => {
        if(!state) return;
        return state.ExpenseReducer.expenses.filter(expense => !expense.paid).reduce((acumulator, prevValue) => {
            return acumulator +  Number(prevValue.value);
        }, 0)
    }
)

export const ExpensePaidTotalValue = createSelector(
    StateSelector,
    (state: any) => {
        if(!state) return;
        return state.ExpenseReducer.expenses.filter(expense => expense.paid).reduce((acumulator, prevValue) => {
            return acumulator +  Number(prevValue.value);
        }, 0)
    }
)

export const LoadingValue = createSelector(
    StateSelector,
    (state: any) => {
        if(!state) return;
        return state.ExpenseReducer.loading;
    }
)