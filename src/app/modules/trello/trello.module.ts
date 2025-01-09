import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrelloComponent } from './components';
import { TrelloListComponent } from './components';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{
    path: '',
    component: TrelloComponent
}];

@NgModule({
  declarations: [TrelloComponent, TrelloListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButton,
    MatIconModule
  ]
})
export class TrelloModule { }
