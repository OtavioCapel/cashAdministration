import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Expense } from '../expenses/models/expenses.model';
import { AppState } from '../state';
import { AddExpense } from '../state/expenses/expense.actions';

@Component({
  selector: 'app-home', 
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  expense$: Observable<Expense[]>
 
  constructor(
    private router: Router,
    private store$: Store<AppState>
    ) {
  }


  ngOnInit() {
  }

  teste() {
    this.router.navigate(['/expenses']);
  }

}
