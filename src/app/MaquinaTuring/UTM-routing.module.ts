import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UTMComponent } from './components/UTM.component';


const routes: Routes = [
  {
    path: '',
        component: UTMComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
