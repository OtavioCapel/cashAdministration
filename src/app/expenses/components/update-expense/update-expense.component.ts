import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.scss'],
})
export class UpdateExpenseComponent implements OnInit {

  addExpenseForm: FormGroup;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addExpenseForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      value: new FormControl('', [Validators.required, Validators.min(0.1)]),
      expireDate: new FormControl('', [Validators.required]),
      monthly: new FormControl(false),
      description: new FormControl(),
    })
  }

  closeModal(value?) {
    this.modalCtrl.dismiss(value);
  }

  onSubmit() {
    this.closeModal(this.addExpenseForm.getRawValue());
  }
}
