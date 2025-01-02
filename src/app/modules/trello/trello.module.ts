import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrelloComponent } from './components';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '',
    component: TrelloComponent
}];

@NgModule({
  declarations: [TrelloComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TrelloModule { }
