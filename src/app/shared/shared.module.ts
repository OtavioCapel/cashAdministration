import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IonicModule } from '@ionic/angular';
import { PaymentStatusPipe } from '../shared/pipes/payment-status.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { BaseTitleMenuComponent } from './components/menu/base-title-menu.component';
import { LettersOnlyDirective } from './directives/letters-only.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';

@NgModule({
  declarations: [
    PaymentStatusPipe,
    LettersOnlyDirective,
    NumbersOnlyDirective,
    BaseTitleMenuComponent,
    LoadingComponent
    
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    IonicModule,
    MatProgressSpinnerModule
  ],
  exports: [
    PaymentStatusPipe,
    LettersOnlyDirective,
    BaseTitleMenuComponent,
    LoadingComponent
    
  ]
})
export class SharedModule { }
