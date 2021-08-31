import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators , FormBuilder } from '@angular/forms';
import  { SignupModel} from './SignupModel'
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PasswordValidator } from './passwordValidator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  formSubmitAttempt: boolean;
  signupModel: SignupModel;
  signupForm: FormGroup = new FormGroup({}); 
  

  constructor(private authService: AuthServiceService , private router: Router,
    private toastr: ToastrService, private formBuilder: FormBuilder) {

    this.signupModel = {
      username: "",
      firstName:"",
      lastName:"",
      email: "",
      password: ""
    };
   
    this.signupForm = formBuilder.group({
      username: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['',[ Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]]
     }, 
     { 
      validator:  PasswordValidator ('password', 'cpassword')
     })
   }

  ngOnInit(): void {
     
  }


  get f(){
    return this.signupForm.controls;
  }


  signup() {

    this.formSubmitAttempt = true;

    if (this.signupForm.valid)
    {
      this.signupModel.email = this.signupForm.get('email')?.value;
      this.signupModel.username = this.signupForm.get('username')?.value;
      this.signupModel.firstName = this.signupForm.get('firstname')?.value;
      this.signupModel.lastName = this.signupForm.get('lastname')?.value;
      this.signupModel.password = this.signupForm.get('password')?.value;

      this.authService.signup(this.signupModel)
      .subscribe(data => {
        this.router.navigate(['/login'],
          { queryParams: { registered: 'true' } });
      }, error => {
        console.log(error);
        this.toastr.error('Registration Failed! Possibly you are using existing email or Username! Please try again');
      });
    }
  }

}


     
