import { Expense } from "src/app/expenses/models/expenses.model";
import { ExpensesActions, ExpensesActionTypes } from "./expense.actions";



const initialState: Expense[] = []

export function ExpenseReducer(state = initialState, action: ExpensesActions) {
    switch(action.type) {

        case ExpensesActionTypes.GET_EXPENSES_SUCCESS:
            return action.payload
            
        case ExpensesActionTypes.CREATE_EXPENSE:
            return state.concat(action.payload)  
            

        case ExpensesActionTypes.UPDATE_EXPENSE:
            if(!action.payload._id) return
            const index = state.findIndex((item: Expense) => item._id === action.payload._id);
            const _expenses = [...state]
            _expenses[index] = action.payload  

            return _expenses

            

        case ExpensesActionTypes.DELETE_EXPENSE:
            return state.filter((expense: Expense) => expense != action.payload)
    }
}