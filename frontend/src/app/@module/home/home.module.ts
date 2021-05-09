import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class HomeModule {}
