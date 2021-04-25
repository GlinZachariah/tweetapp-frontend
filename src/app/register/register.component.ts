import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from "../main.service";
import { RegisterForm } from "../models/userInputForm";
import { IncomingResponse } from "../models/incomingdata.model";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  userExists: boolean = false;
  registerFormData: RegisterForm;
  success: boolean = false;
  error: boolean = false;
  registerForm: FormGroup = new FormGroup({
    userId: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: this.checkPasswords });

  checkPasswords(form: FormGroup) { // here we have the 'passwords' group
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true }
  }

  get f() { return this.registerForm.controls; }

  get e() { return this.registerForm.errors; }



  constructor(private service: MainService) {
    this.registerFormData = new RegisterForm();
  }

  ngOnInit(): void {
  }

  formSubmit(formData) {
    this.submitted = true;
    if (formData.status == "VALID") {
      this.registerFormData.userId = this.f.userId.value;
      this.registerFormData.password = this.f.password.value;
      this.registerFormData.firstName = this.f.firstName.value;
      this.registerFormData.lastName = this.f.lastName.value;
      this.registerFormData.contactNumber = this.f.contactNumber.value;
      this.registerFormData.email = this.f.email.value;

      this.service.registerNewUser(this.registerFormData).subscribe((res: IncomingResponse) => {
        if (res.code == 201) {
          this.registerForm.reset();
          this.submitted = false;
          this.userExists = false;
          this.success = true;
        } else if (res.code == 409) {
          this.userExists = true;
        } else {
          this.error = true;
        }
      });
    }


  }

  resetMessage() {
    this.userExists = false;
    this.success = false;
    this.error = false;
  }

}
