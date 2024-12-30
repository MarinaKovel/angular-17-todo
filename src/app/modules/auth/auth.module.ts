import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent, RegistrationComponent } from "./components";

@NgModule({
    declarations: [LoginComponent, RegistrationComponent],
    imports: [CommonModule]
})

export class AuthModule {}