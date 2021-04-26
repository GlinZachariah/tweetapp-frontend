import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { IncomingResponse } from '../models/incomingdata.model';
import { LoginForm } from '../models/userInputForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  state: string;
  submitted: boolean = false;
  error: boolean = false;
  errormsg: string;
  success: boolean = false;
  successmsg: string;
  loginform: FormGroup = new FormGroup({
    userId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private route: ActivatedRoute, private service: MainService, private currentRoute: Router) {
    this.state = (route.snapshot.routeConfig.path == "login") ? "login" : "forgot";
  }

  get f() { return this.loginform.controls; }

  ngOnInit(): void {
  }

  formSubmit() {

    this.submitted = true;
    let formData = new LoginForm();
    formData.userId = this.f.userId.value;
    formData.password = this.f.password.value;

    if (this.state == "login") {
      this.service.loginUser(formData).subscribe((res: IncomingResponse) => {
        if (res.code == 200) {
          this.success = true;
          this.successmsg = "Logged In Successfully!"
          localStorage.setItem("tweetapp-loggeduser", formData.userId);
          setTimeout(() => {
            this.service.isUserLoggedIn.next(true);
            this.currentRoute.navigate(['/tweets']);

          }, 1000)
        } else {
          this.error = true;
          this.errormsg = "Failed to Login! Invalid credentials";
        }

      });
    } else {
      this.service.resetUserPassword(formData).subscribe((res: IncomingResponse) => {
        if (res.code == 200) {
          this.success = true;
          this.successmsg = "Reset Password Complete!"
        } else if (res.code == 400) {
          this.error = true;
          this.errormsg = "Invalid User!";
        } else {
          this.error = true;
          this.errormsg = "Invalid Credentials!";
        }
      });
    }
  }

  resetForm() {
    this.submitted = false;
    this.error = false;
    this.success = false;
  }

}
