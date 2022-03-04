import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../state';
import { GetExpenses } from '../state/expenses/expense.actions';
import { ExpenseTotalValue } from '../state/expenses/expense.selector';

@Component({
  selector: 'app-home', 
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  expensetotalValue$: Observable<number> = this.store$.select(ExpenseTotalValue).pipe(filter(value => value))
  
  constructor(
    private router: Router,
    private store$: Store<AppState>
    ) {
  }


  ngOnInit() {
    this.store$.dispatch(new GetExpenses());
  }

  teste() {
    this.router.navigate(['/expenses']);
  }

}
