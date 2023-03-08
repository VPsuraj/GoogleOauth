import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { user } from 'src/app/appmodel/user.model';
import { MustMatch } from 'src/app/Components/helper/index';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  

  registerForm!: UntypedFormGroup;
  submitted = false;
  showPass = true;


  constructor(private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Z]{1}[a-z]{2,}$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-z]{2,}$')]],
      emailId: ['', [Validators.required, ]],  // Validators.pattern('^[a-zA-Z0-9]{3,}([._+-][0-9a-zA-Z]{2,})*@[0-9a-zA-Z]+[.]?([a-zA-Z]{2})+[.]([a-zA-Z]{3})+$')
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  //convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  showPassword() {
    this.showPass = !this.showPass;
  }

  toggleLogin() {
    console.log("Toggle Login");
    setTimeout(() => {
      this.toastr.info("Redirected To Login Page", "Login Form", {
      })
      this.router.navigateByUrl('/login')
    }, 1500);
  }

  onSubmit() {
    console.log("form value data!!!", this.registerForm.value);
    if (this.registerForm.invalid) {
      console.log("form is invalid!!")
    } else {
      const email = this.registerForm.value.emailId;
      const password = this.registerForm.value.password;
      this.auth.singup(email, password).subscribe((resData: any) => {
        console.log("resData", resData);
      })
    }
  }


 
}
