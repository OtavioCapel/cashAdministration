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

export interface Filters {
  filterLabel: string;
  condition: string;
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit, OnDestroy {
  public expenses$: Observable<Expense[]>; 
  public selectedFilter: string;

  public filters: Filters[] = [
    {filterLabel: 'Pagas', condition: 'paid' },
    {filterLabel: 'Vencidas', condition: 'expired'},
    {filterLabel: 'Em aberto', condition: 'not-paid'}
  ]

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
    this.selectedFilter = '';
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
        data: expense ? expense : null,
        animated: true
      }
    });

    return await modal.present();
  }

  filterExpenses(condition) {
    
    this.expenses$ = this.expenseService.filteredExpenses(condition)
  }

  teste() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    console.log('OnDestroy');
  }

}
