import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensesPageRoutingModule } from './expenses-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ExpensesPage } from './expenses.page';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule  } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    ExpensesPageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    SharedModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    ExpensesPage, 
    UpdateExpenseComponent
  ]
})
export class ExpensesPageModule {}
