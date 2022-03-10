import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from '.';
import { ExpenseReducer } from './expenses/expense.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({ ExpenseReducer }),
    EffectsModule.forRoot(effects)
  ]
})
export class StateModule { }
