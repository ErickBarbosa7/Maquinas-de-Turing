import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UTMComponent } from './components/UTM/UTM.component';


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
export class UsuariosModule { 
  
}
