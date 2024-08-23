import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UTMComponent } from './UTM/UTM.component';

const routes: Routes = [
  { path: 'utm', component: UTMComponent },
  { path: '', redirectTo: '/utm', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
    
}
