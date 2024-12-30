import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent, RegistrationComponent } from "./components";
import { RouterModule, Routes } from "@angular/router";

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
        RouterModule.forChild(routes)
    ]
})

export class AuthModule {}