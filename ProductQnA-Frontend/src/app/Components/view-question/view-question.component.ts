import { Component, OnInit } from '@angular/core';
import {  faComments ,  faHeart, faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons'
import { QuestionService } from 'src/app/Services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionModel } from '../home/QuestionModel';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentModel } from './commentModel';
import { CommentService } from 'src/app/Services/comment.service';
import { AuthServiceService } from 'src/app/Services/auth-service.service';



@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {

  faComments =faComments;
  faHeart =faHeart;
  faArrowCircleLeft = faArrowCircleLeft;
  queId: number;
  question: QuestionModel;
  commentForm  : FormGroup;
  comment : CommentModel;
  comments: any;
  formSubmitAttempt: boolean;
 

  constructor(private questionService :QuestionService, private commentService : CommentService , 
    private authService : AuthServiceService,private activateRoute: ActivatedRoute,
     private router: Router) { 
      this.queId = this.activateRoute.snapshot.params.id;

      this.commentForm = new FormGroup({
        text: new FormControl('', Validators.required)
      });

      this.comment = {
        id:0,
        text: '',
        questionId:this.queId,
        userName:'',
        likeCount:0
      };
     }

  ngOnInit(): void {
    this.getQuestionById();
    this.getCommentsForQuestion();
  }

  postComment() {
    this.formSubmitAttempt = true;
    if (this.commentForm.valid)
    {
      
    this.comment.text = this.commentForm.get('text')?.value;
    this.comment.userName = this.authService.getUserName();
    this.comment.likeCount=0;
   
    this.commentService.postComment(this.comment).subscribe(data => {
      this.formSubmitAttempt=false;
      this.commentForm.get('text')?.setValue('');
      this.getCommentsForQuestion();     
     
    }, error => {
      console.log(error);
    })}
  }

  private getQuestionById() {
    this.questionService.getQuestion(this.queId).subscribe(data => {
      this.question = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForQuestion() {
    this.commentService.getAllCommentsForQuestion(this.queId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }

  LikeComment(commentModel : CommentModel){
    commentModel.likeCount = commentModel.likeCount+1;
    

    this.commentService.updateLikesforComment(commentModel.id , commentModel).subscribe(data => {
      this.comments = data;
      this.router.navigateByUrl('/viewquestion/' + commentModel.questionId);
    }, error => {
      console.log(error);
    })
  }

  profile(username : string){
    this.router.navigateByUrl('/userprofile/' +username);
  }

  back(){
    this.router.navigateByUrl('home');
  }

}
