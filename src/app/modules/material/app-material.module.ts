import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class AppMaterialModule { }
