import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewMatchComponent } from './new-match/new-match.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: NewMatchComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }