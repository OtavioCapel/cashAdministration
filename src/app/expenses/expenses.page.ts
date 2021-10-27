import { Component, OnInit } from '@angular/core';
import { Expense } from './models/expenses.model';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {


  expenses: Expense[] =
  [
    {name: 'Luz', value: '220,00', monthly: true, paid: false, expireDate: moment(new Date()).add(7, 'days')},
    {name: 'Agua', value: '110,00', monthly: true, paid: false, expireDate: moment(new Date()).subtract(7, 'days')},
    {name: 'Net', value: '90,00', monthly: true, paid: true, expireDate: new Date()},
    {name: 'Gás', value: '100,00', monthly: true, paid: false, expireDate: new Date()},
    {name: 'Telefone', value: '1.160,00', monthly: false, paid: false, expireDate: new Date()},
  ]

  constructor(public modalController: ModalController) {

  }

  ngOnInit() {

  }

  async updateExpense() {
    const modal = await this.modalController.create({
      component: UpdateExpenseComponent,
    });
    from(modal.onDidDismiss()).subscribe(result => {
      if(result.data)
        this.expenses.push(result.data);
    })
    // modal.onDidDismiss().then(data => {
    //   console.log(data)
    // })
    return await modal.present();
  }

}
