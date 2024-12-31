import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public form!: FormGroup

  constructor() {
    this.initForm()
  }
  
  public submit(): void {
    console.log(this.form.controls);
  }

  public getErrorMessage(fieldName: string): string {
    const field: AbstractControl = this.form.controls[fieldName];
    const isRequired: boolean = field?.errors?.['required'];
    if (isRequired) {
      return 'Field is required'
    }
    return (fieldName === 'email') ? 'Email is not valid' : 'Password must be >5 symbols'
  }

  public getEmailErrorMessage(): string {
    const field: AbstractControl = this.form.controls['email'];
    const isRequired: boolean = field?.errors?.['required'];
    return isRequired ? 'Field is required' : 'Email is not valid'
  }

  public getPasswordErrorMessage(): string {
    const field: AbstractControl = this.form.controls['password'];
    const isRequired: boolean = field?.errors?.['required'];
    return isRequired ? 'Field is required' : 'Password must be >5 symbols'
  }
  
  private initForm(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }
}
