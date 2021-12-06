import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Expense } from './models/expenses.model';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';
import { from, Observable } from 'rxjs';
import { AppState } from '../state';
import { select, Store } from '@ngrx/store';
import { AddExpense, GetExpenses } from '../state/expenses/expense.actions';
import { Router } from '@angular/router';
import { ExpenseService } from '../shared/services/expense.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit, OnDestroy {
  expenses$: Observable<Expense[]>;
  //expenses: Observable<Expense[]> 

  currentDate = new Date();
  // [
  //   {name: 'Luz', value: '220,00', monthly: true, paid: false, expireDate: moment(new Date()).add(7, 'days')},
  //   {name: 'Agua', value: '110,00', monthly: true, paid: false, expireDate: moment(new Date()).subtract(7, 'days')},
  //   {name: 'Net', value: '90,00', monthly: true, paid: true, expireDate: new Date()},
  //   {name: 'Gás', value: '100,00', monthly: true, paid: false, expireDate: new Date()},
  //   {name: 'Telefone', value: '1.160,00', monthly: false, paid: false, expireDate: new Date()},
  // ]

  constructor(
    public modalController: ModalController,
    private store: Store<AppState>,
    private router: Router,
    private expenseService: ExpenseService
    ) {

  }

  ngOnInit() {
    this.getExpenses();
  }

  getExpenses() {
   this.expenses$ = this.store.pipe(select('expenses'))
    .pipe(
      filter(results => !!results),
      map((result: any) => result.expenses)
    )

    this.store.dispatch(new GetExpenses());
    
  }

  async updateExpense(expense?: Expense) {
    const modal = await this.modalController.create({
      component: UpdateExpenseComponent,
      componentProps: {
        'data': expense ? expense : null,
        animated: true
      }
    });

    return await modal.present();
  }

  filterExpenses(attribute, condition, value) {
    let conditionToCompare = {
      equal: '==',
      different: '!=',
      lessThan: '<=',
      moreThan: '>=',
    }
    
    this.expenses$ = this.expenseService.filteredExpenses(attribute, conditionToCompare[condition], value)
  }

  teste() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    console.log('OnDestroy');
  }

}
