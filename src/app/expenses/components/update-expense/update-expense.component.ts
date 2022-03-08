import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
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
      this.changeCheckbox(this.data.paymentDate ? true : false, 'paymentDate');
    } 
    
  }

  createForm(): void {
    this.addExpenseForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20), Validators.pattern('^[a-zA-Z \-\']+')]),
      value: new FormControl('', [Validators.required, Validators.min(0.1)]),
      expireDate: new FormControl('', [Validators.required]),
      monthly: new FormControl(false),
      description: new FormControl(),
      paid: new FormControl(this.data && this.data.paymentDate ? true : false),
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

  removeValue(formControlName: string) {
    if (this.addExpenseForm.get(formControlName)) {
      this.addExpenseForm.get(formControlName).setValue(null)
    }
  }

  changeCheckbox(checked = false, controlName: string) {
    if(checked) {
      this.addExpenseForm.get('expireDate').setValidators(null);
      this.addExpenseForm.addControl(controlName,  new FormControl(
        this.data ? this.data[controlName] : '', Validators.required 
      ));
    } else {
      this.addExpenseForm.get('expireDate').setValidators([Validators.required]);
      this.removeValue(controlName);
      this.addExpenseForm.removeControl(controlName);
    }
   
  }

  countChar() {
    this.descriptionCharacters = this.addExpenseForm.get('description').value.split('').length
  }

  onSubmit() {
    if(!this.addExpenseForm.valid) return;
    
    const formValue = this.addExpenseForm.getRawValue();
    
    const expense: Expense = this.data ? { _id: this.data._id,  ...formValue} : formValue
    if (expense._id) this.store$.dispatch(new UpdateExpense(expense))  
    else this.store$.dispatch(new AddExpense(expense));
    this.closeModal();
  }

}
