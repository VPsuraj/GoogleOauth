import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { SocialAuthService } from "angularx-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  showPass = true;
  tokenExist: any = ""

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private auth:AuthService,
    // private SocialauthService: SocialAuthService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,}([._+-][0-9a-zA-Z]{2,})*@[0-9a-zA-Z]+[.]?([a-zA-Z]{2})+[.]([a-zA-Z]{3})+$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,}$')]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  showPassword() {
    this.showPass = !this.showPass;
  }

  onSubmit() {
    if(this.loginForm.invalid){
      console.log("form is invalid!!")
    }else{
      console.log("form value data!!!", this.loginForm.value);
      const email = this.loginForm.value.emailId;
      const password = this.loginForm.value.password;
      this.auth.signin(email, password).subscribe((resData:any) => {
        console.log("resData", resData);
      })
    }
  }
  toggleRegister() {
    setTimeout(() => {
      this.toastr.info("Redirected To Register Page", "Register Form", {
      })
      this.router.navigateByUrl('/')
    }, 1500);
  }
  toggleForgotPass() {
    setTimeout(() => {
      this.toastr.info("Redirected To Forgot Password Page", "Forgot Password Form", {
      })
      this.router.navigateByUrl('/forgotpassword')
    }, 1500);
  }

  // signInGoogle(){
  //   console.log("undefined gapi");
  //   console.log("Google Sign In");
  //   this.SocialauthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
  //     (res) => {
  //       console.log("Google Sign In Response", res.name);
  //   },(err) => {
  //     console.log("Google Sign In Error", err);
  //   })
  // }
}
