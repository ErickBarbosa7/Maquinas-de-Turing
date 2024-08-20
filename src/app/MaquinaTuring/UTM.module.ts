import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UTMComponent } from './components/UTM.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    UTMComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class UsuariosModule { }
