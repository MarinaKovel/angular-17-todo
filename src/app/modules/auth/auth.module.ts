import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent, RegistrationComponent } from "./components";
import { RouterModule, Routes } from "@angular/router";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";

const routes: Routes = [{
    path: 'login',
    component: LoginComponent
}, {
    path: 'registration',
    component: RegistrationComponent
}];

@NgModule({
    declarations: [LoginComponent, RegistrationComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatFormField,
        MatInput,
        MatLabel,
        MatButton
    ]
})

export class AuthModule {}