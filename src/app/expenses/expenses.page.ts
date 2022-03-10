import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ExpenseService } from '../shared/services/expense.service';
import { AppState } from '../state';
import { GetExpenses } from '../state/expenses/expense.actions';
import { ExpensesValue, LoadingValue } from '../state/expenses/expense.selector';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';
import { Expense } from './models/expenses.model';

export interface Filters {
  filterLabel: string;
  condition: string;
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit, OnDestroy, AfterContentChecked {
  public expenses$: Observable<Expense[]>; 
  public state$: Observable<AppState[]>; 

  public selectedFilter: string;

  public filters: Filters[] = [
    { filterLabel: 'Pagas', condition: 'paid' },
    { filterLabel: 'Vencidas', condition: 'expired' },
    { filterLabel: 'Em aberto', condition: 'not-paid' }
  ]
  loading$: Observable<boolean>;

  constructor(
    public modalController: ModalController,
    private store$: Store<AppState>,
    private router: Router,
    private expenseService: ExpenseService,
    private changeDetector: ChangeDetectorRef
    ) {

  }

  ngOnInit() {
    this.getExpenses();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  getExpenses() {
    this.selectedFilter = '';
    this.expenses$ =  this.store$.select(ExpensesValue)
    .pipe(
      filter(results => !!results),
    )
    this.loading$ =  this.store$.select(LoadingValue)

   
    this.store$.dispatch(new GetExpenses());
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
