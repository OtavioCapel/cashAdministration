import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentStatusPipe } from '../shared/pipes/payment-status.pipe';
import { LettersOnlyDirective } from './directives/letters-only.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { BaseTitleMenuComponent } from './components/menu/base-title-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    PaymentStatusPipe,
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
    LettersOnlyDirective,
    BaseTitleMenuComponent,
    
  ]
})
export class SharedModule { }
