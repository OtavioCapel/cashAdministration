import { createSelector } from "@ngrx/store";
import { AppState } from "..";


export const ExpenseSelector = (state: AppState) => state.expenses;

export const ExpenseTotalValue = createSelector(
    ExpenseSelector,
    (state: any) => {
        if(!state) return;
        let { expenses } = state;
        return expenses.reduce((acumulator, prevValue) => {
            return acumulator + Number(prevValue.value);
        }, 0)
    }
)