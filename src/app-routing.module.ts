import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UTMComponent } from './UTM/UTM.component';
import { PYComponent } from './PY/PY.component';

const routes: Routes = [
  { path: 'utm', component: UTMComponent },
  { path: 'py', component: PYComponent },
  { path: '', redirectTo: '/utm', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
    
}
