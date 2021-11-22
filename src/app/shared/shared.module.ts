import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentStatusPipe } from '../shared/pipes/payment-status.pipe';
import { TimestampDatePipe } from './pipes/timestampDate.pipe';
import { LettersOnlyDirective } from './directives/letters-only.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { BaseTitleMenuComponent } from './components/menu/base-title-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    PaymentStatusPipe,
    TimestampDatePipe,
    LettersOnlyDirective,
    NumbersOnlyDirective,
    BaseTitleMenuComponent,
    
  ],
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  exports: [
    PaymentStatusPipe,
    TimestampDatePipe,
    LettersOnlyDirective,
    BaseTitleMenuComponent,
    
  ]
})
export class SharedModule { }
