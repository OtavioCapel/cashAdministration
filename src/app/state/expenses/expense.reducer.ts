import { Expense } from "src/app/expenses/models/expenses.model";
import { ExpensesActions, ExpensesActionTypes } from "./expense.actions";



const initialState: any = []

export function ExpenseReducer(state = initialState, action: ExpensesActions) {
    switch(action.type) {

        case ExpensesActionTypes.GET_EXPENSES_SUCCESS:
            return {
                ...state,
                expenses: action.payload
            }

        case ExpensesActionTypes.CREATE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.concat(action.payload) 
            } 
            

        case ExpensesActionTypes.UPDATE_EXPENSE:
            if(!action.payload._id) return
            const index = state.expenses.findIndex((item: Expense) => item._id === action.payload._id);
            const _expenses = [...state.expenses]
            _expenses[index] = action.payload  

            return {
                ...state,
                expenses: _expenses
            };
            

        break;

        case ExpensesActionTypes.DELETE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.filter((expense: Expense) => expense != action.payload)
            }
    }
}