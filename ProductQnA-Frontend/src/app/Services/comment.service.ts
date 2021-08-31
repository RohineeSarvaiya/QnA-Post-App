import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentModel } from '../Components/view-question/commentModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForQuestion(queId: number) {
    return this.httpClient.get<CommentModel[]>('http://localhost:8080/api/comments/byquestion/' + queId);
  }

  postComment(comment: CommentModel) {
    return this.httpClient.post('http://localhost:8080/api/comments', comment);
  }

  getAllCommentsByUser(username: string) {
    return this.httpClient.get<CommentModel[]>('http://localhost:8080/api/comments/byuser/' + username);
  }

  updateLikesforComment(id: number ,commentModel: CommentModel ){
    return this.httpClient.put('http://localhost:8080/api/comments/' + id, commentModel);
  }
}
