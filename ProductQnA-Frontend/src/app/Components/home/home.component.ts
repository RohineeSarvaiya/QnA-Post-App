import { Component, OnInit } from '@angular/core';
import { QuestionModel } from './QuestionModel';
import { QuestionService } from 'src/app/Services/question.service';
import {  faComments , faHeart, faSearch, faArrowCircleLeft,faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { QuestionRequest } from '../create-question/QuestionRequest';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  faHeart = faHeart ;  
  faUserCircle=faUserCircle;
  faComments =faComments;
  faArrowCircleLeft = faArrowCircleLeft;
  faSearch = faSearch;
  username : string;
  questionRequest : QuestionRequest;
  searchForm: FormGroup;
  keyword:string;
  searchtype:string;
  sortType:string;
  questions$: any = [];
  searchAttemted :boolean;

  constructor(private questionService : QuestionService, private authService : AuthServiceService ,
     private router: Router, private toastr: ToastrService) {

    this.sortType="createdDate";
    this.searchAttemted=false;

    this.questionService.getAllQuestions().subscribe(question => {
      this.questions$ = question;
    });

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

    this.username = this.authService.getUserName();
    this.searchForm = new FormGroup({
      keyword: new FormControl('', Validators.required),
      searchtype: new FormControl('', Validators.required)
    });
    
  }


  askQuestion() {
    this.router.navigateByUrl('askquestion');
  }


  viewQuestion(id: number): void {
    this.router.navigateByUrl('/viewquestion/' + id);
  }


  goToUserProfile() {
    this.router.navigateByUrl('/userprofile/' + this.username);
  }


  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
    this.toastr.success('Logout! Bye!!');
  }


  LikeQuestion(question : QuestionModel){
    this.questionRequest.description=question.description;
    this.questionRequest.statement=question.statement;
    this.questionRequest.productCode=question.productCode;
    this.questionRequest.label=question.label;
    this.questionRequest.username=question.userName
    this.questionRequest.likeCount=question.likeCount+1;

    this.questionService.updateLikesforQuestion(question.id , this.questionRequest).subscribe(question => {
      this.questions$ = question;
      this.router.navigateByUrl('home');
    }, error => {
      console.log(error);
    })
  }
  
  search(){
    this.keyword = this.searchForm.get('keyword')?.value;
    this.searchtype = this.searchForm.get('searchtype')?.value;
    this.searchAttemted=true;

    if(this.searchtype=="ProductCode")
    {
      this.questionService.getQuestionsByProductCode(this.keyword).subscribe(question => {
        this.searchForm.get('keyword')?.setValue('');
        this.searchForm.get('searchtype')?.setValue('');
        this.questions$ = question;
        this.router.navigateByUrl('home');
      }, error => {
        console.log(error);
      })
    }
    else if(this.searchtype=="QuestionText")
    {
      this.questionService.getQuestionsByStatement(this.keyword).subscribe(question => {
        this.searchForm.get('keyword')?.setValue('');
        this.searchForm.get('searchtype')?.setValue('');
        this.questions$ = question;
        this.router.navigateByUrl('home');
      }, error => {
        console.log(error);
      })
    }
    else if(this.searchtype=="Label")
    {
      this.questionService.getQuestionsByLabel(this.keyword).subscribe(question => {
        this.searchForm.get('keyword')?.setValue('');
        this.searchForm.get('searchtype')?.setValue('');
        this.questions$ = question;
        this.router.navigateByUrl('home');
      }, error => {
        console.log(error);
      })
    }
    else if(this.searchtype=="Useremail")
    {
      console.log(this.searchtype)
      this.questionService.getQuestionsByUseremail(this.keyword).subscribe(question => {
        this.searchForm.get('keyword')?.setValue('');
        this.searchForm.get('searchtype')?.setValue('');
        this.questions$ = question;
        this.router.navigateByUrl('home');
      }, error => {
        console.log(error);
      })
    }
    else if(this.searchtype=="Date(dd-mm-yyyy)")
    {
      this.questionService.getQuestionsByDate(this.keyword).subscribe(question => {
        this.searchForm.get('keyword')?.setValue('');
        this.searchForm.get('searchtype')?.setValue('');
        this.questions$ = question;
        this.router.navigateByUrl('home');
      }, error => {
        console.log(error);
      })
    }
    else
    {
      this.questionService.getAllQuestions().subscribe(question => {
        this.searchForm.get('keyword')?.setValue('');
        this.searchForm.get('searchtype')?.setValue('');
        this.questions$ = question;
        this.router.navigateByUrl('home');
      }, error => {
        console.log(error);
      })
    }

  }

  sort(s : string){
    this.sortType = s;
  }

  profile(username : string){
    this.router.navigateByUrl('/userprofile/' +username);
  }

  back(){
    this.questionService.getAllQuestions().subscribe(question => {
      this.searchForm.get('keyword')?.setValue('');
      this.searchForm.get('searchtype')?.setValue('');
      this.questions$ = question;
      this.router.navigateByUrl('home');
    }, error => {
      console.log(error);
    })
  }
  
}
