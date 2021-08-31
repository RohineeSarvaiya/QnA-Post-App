import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/Services/question.service';
import { CommentService } from 'src/app/Services/comment.service';
import { QuestionModel } from '../home/QuestionModel';
import { CommentModel } from '../view-question/commentModel';
import { Router } from '@angular/router';
import {  faComments , faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  faComments =faComments;
  faArrowCircleLeft =faArrowCircleLeft;
  username: string;
  questions: QuestionModel[];
  comments: CommentModel[];
  questionLength: number;
  commentLength: number;

  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService,
    private commentService: CommentService, private router: Router) {

    this.username = this.activatedRoute.snapshot.params.username;

    this.questionService.getAllQuestionsByUser(this.username).subscribe(data => {
      this.questions = data;
      this.questionLength = data.length;
    });

    this.commentService.getAllCommentsByUser(this.username).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });

  }

  ngOnInit(): void {
  }

  viewQuestion(id: number): void {
    this.router.navigateByUrl('/viewquestion/' + id);
  }

  back(){
    this.router.navigateByUrl('home');
  }

}
