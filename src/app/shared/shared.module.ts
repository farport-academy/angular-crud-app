import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { TableComponent } from './table/table.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    FormComponent,
    ErrorComponent,
    TableComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormComponent,
    ErrorComponent,
    TableComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
