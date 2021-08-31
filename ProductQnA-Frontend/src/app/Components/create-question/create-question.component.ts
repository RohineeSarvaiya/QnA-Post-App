import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionRequest } from './QuestionRequest';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/Services/question.service';
import { AuthServiceService } from 'src/app/Services/auth-service.service';


@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})

export class CreateQuestionComponent implements OnInit {

  questionForm : FormGroup;
  questionRequest : QuestionRequest;
  formSubmitAttempt: boolean;

  constructor(private router : Router , private questionService : QuestionService,
    private authService :AuthServiceService) {

    this.questionRequest ={
      description:'',
      statement:'',
      productCode:'',
      label:'',
      username:'',
      likeCount:0
    }

  }

  ngOnInit(): void {

    this.questionForm = new FormGroup({
      description: new FormControl('',),
      statement: new FormControl('', Validators.required),
      productCode: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
    });

  }

  askQuestion() {

    this.formSubmitAttempt = true;

    if (this.questionForm.valid)
    {
      this.questionRequest.description = this.questionForm.get('description')?.value;
      this.questionRequest.statement = this.questionForm.get('statement')?.value;
      this.questionRequest.productCode = this.questionForm.get('productCode')?.value;
      this.questionRequest.label = this.questionForm.get('label')?.value;
      this.questionRequest.username = this.authService.getUserName();
      this.questionRequest.likeCount=0;

      this.questionService.askQuestion(this.questionRequest).subscribe((data) => {
        this.router.navigateByUrl('home');
      }, error => {
      console.log(error);
      });
      
    }

  }

  discardQuestion() {
    this.router.navigateByUrl('home');
  }

}
