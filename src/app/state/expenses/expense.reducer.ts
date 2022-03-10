import { Expense } from "src/app/expenses/models/expenses.model";
import { initialState } from "..";
import { ExpensesActions, ExpensesActionTypes } from "./expense.actions";




export function ExpenseReducer(state = initialState, action: ExpensesActions) {
    switch(action.type) {

        case ExpensesActionTypes.GET_EXPENSES_SUCCESS:

            return  { ...state, expenses: action.payload, loading: false };
            
        case ExpensesActionTypes.CREATE_EXPENSE:
            return state.expenses.concat(action.payload)  
            
        case ExpensesActionTypes.GET_EXPENSES:
            return  { ...state, loading: true };

        case ExpensesActionTypes.UPDATE_EXPENSE:
            if(!action.payload._id) return
            const index = state.expenses.findIndex((item: Expense) => item._id === action.payload._id);
            const _expenses = [...state.expenses]
            _expenses[index] = action.payload  

            return _expenses

            

        case ExpensesActionTypes.DELETE_EXPENSE:
            return state.expenses.filter((expense: Expense) => expense != action.payload)
    }
}

