import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { LoginRequest } from './loginRequest';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  formSubmitAttempt: boolean;
  loginForm: FormGroup;
  loginRequest: LoginRequest;
  registerSuccessMessage: string;
  isError: boolean;


  constructor(private authService: AuthServiceService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { 

    this.loginRequest = {
      username: "",
      password: ""
    };
    
  }


  ngOnInit(): void {

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
    .subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup Successful!!');
        this.registerSuccessMessage = 'Please Check your inbox for activation email '
          + 'activate your account before you Login!';
      }
    });

  }

  login() {

    this.formSubmitAttempt = true;

    if (this.loginForm.valid)
    {
      this.loginRequest.username = this.loginForm.get('username')?.value;
      this.loginRequest.password = this.loginForm.get('password')?.value;

      this.authService.login(this.loginRequest).subscribe(data => {
        this.isError = false;
        this.router.navigateByUrl('home');
        this.toastr.success('Login Successful!!');
      }, error => {
        this.isError = true;
        throwError(error);
      });
    }

  }
  
}
