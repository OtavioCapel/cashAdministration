import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core'

import { ExpenseService } from 'src/app/shared/services/expense.service';
import { AppState } from 'src/app/state';
import { AddExpense, DeleteExpense, UpdateExpense } from 'src/app/state/expenses/expense.actions';
import { Expense } from '../../models/expenses.model';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.scss'],
})
export class UpdateExpenseComponent implements OnInit, AfterContentChecked {

  @Input() data: Expense | null = null;
  public descriptionCharacters: number = 0;
  public addExpenseForm: FormGroup;
  public maxDate = new Date();
  
  constructor(
    public modalCtrl: ModalController,
    private expenseService: ExpenseService,
    private store$: Store<AppState>,
    private changeDetector: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.createForm();
    if(this.data) {
      this.addExpenseForm.patchValue(this.data);
      this.changePaid(this.data.paid);
    } 
    
  }

  createForm(): void {
    this.addExpenseForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z \-\']+')]),
      value: new FormControl('', [Validators.required, Validators.min(0.1)]),
      expireDate: new FormControl('', [Validators.required]),
      monthly: new FormControl(false),
      description: new FormControl(),
      paid: new FormControl(false),
      paymentDate: new FormControl('', [Validators.required]),
    })
  }

  closeModal(value?): void {
    this.modalCtrl.dismiss(value);
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  delete(expense: Expense): void {
    this.store$.dispatch(new DeleteExpense(expense));
    this.closeModal();
  }

  changePaid(checked: boolean): void {
    if(checked) {
      this.addExpenseForm.get('expireDate').setValidators([]);
      this.addExpenseForm.get('expireDate').setErrors(null);

      this.addExpenseForm.get('paymentDate').setValidators([Validators.required])
    } else {
      this.addExpenseForm.get('expireDate').setValidators([Validators.required])

      this.addExpenseForm.get('paymentDate').setValidators([])
      this.addExpenseForm.get('paymentDate').setErrors(null);
    }
    this.addExpenseForm.updateValueAndValidity();
  }

  countChar() {
    this.descriptionCharacters = this.addExpenseForm.get('description').value.split('').length
  }

  onSubmit() {
    if(!this.addExpenseForm.valid) return;
    
    const formValue = this.addExpenseForm.getRawValue();
    const expense: Expense = this.data ? { ...this.data,  ...formValue} : formValue

    if (expense._id) this.store$.dispatch(new UpdateExpense(expense))  
    else this.store$.dispatch(new AddExpense(expense));
    this.closeModal();
  }

}
