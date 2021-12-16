import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core'

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
    private store$: Store<AppState>,
    private changeDetector: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.createForm();

    if(this.data) {
      this.addExpenseForm.patchValue(this.data);
      this.changeCheckbox(this.data.paid, 'paymentDate');
      this.changeCheckbox(this.data.monthly, 'expireDate');
    } 
    
    this.addExpenseForm.valueChanges.subscribe(() => this.checkFieldTosetValidators());
    
  }

  createForm(): void {
    this.addExpenseForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z \-\']+')]),
      value: new FormControl('', [Validators.required, Validators.min(0.1)]),
      monthly: new FormControl(false),
      description: new FormControl(),
      paid: new FormControl(false),
    })
  }

  closeModal(): void {
    this.modalCtrl.dismiss();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  delete(expense: Expense): void {
    this.store$.dispatch(new DeleteExpense(expense));
    this.closeModal();
  }

  changeCheckbox(checked = false, controlName: string) {
    if(checked) {
      this.addExpenseForm.addControl(controlName,  new FormControl(
        this.data ? this.data[controlName] : '', Validators.required 
      ));
    } else {
      this.addExpenseForm.removeControl(controlName)
    }
    this.checkFieldTosetValidators();
  }

  /*
    Function to check paid and monthly form value, 
    at least one must be filled in
  */
  checkFieldTosetValidators() {
    const paid = this.addExpenseForm.get('paid').value;
    const monthly = this.addExpenseForm.get('monthly').value;
    
    if(paid || monthly) this.addExpenseForm.setErrors(null)
    else this.addExpenseForm.setErrors({ required: true })

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
