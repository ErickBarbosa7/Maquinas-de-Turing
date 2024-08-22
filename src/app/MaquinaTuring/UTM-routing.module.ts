import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UTMComponent } from './components/UTM/UTM.component';
import { PYComponent } from './components/PY/PY.component';


const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: 'UTM', component: UTMComponent },
      { path: 'PY', component: PYComponent },
      { path: '**', redirectTo: 'UTM' }
    ]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
