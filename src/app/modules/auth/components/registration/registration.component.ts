import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { formFieldTypes } from '../../types';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
public form!: FormGroup

  constructor() {
    this.initForm()
  }
  
  public submit(): void {
    
  }

  public getErrorMessage(fieldName: formFieldTypes): string {
    const field: AbstractControl = this.form.controls[fieldName];
    const isRequired: boolean = field?.errors?.['required'];
    if (isRequired) {
      return 'Field is required'
    }
    return (fieldName === 'email') ? 'Email is not valid' : 'Password must be >5 symbols'
  }
  
  private initForm(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }
}
