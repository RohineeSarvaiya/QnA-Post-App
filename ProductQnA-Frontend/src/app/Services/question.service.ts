import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionModel } from '../Components/home/QuestionModel';
import { QuestionRequest } from '../Components/create-question/QuestionRequest';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getAllQuestions() {
    return this.http.get<Array<QuestionModel>>('http://localhost:8080/api/questions');
  }

  askQuestion(questionRequest: QuestionRequest){
    return this.http.post('http://localhost:8080/api/questions', questionRequest);
  }

  getQuestion(id: number) {
    return this.http.get<QuestionModel>('http://localhost:8080/api/questions/' + id);
  }

  getAllQuestionsByUser(username: string) {
    return this.http.get<QuestionModel[]>('http://localhost:8080/api/questions/username/' + username);
  }

  updateLikesforQuestion(id: number ,questionRequest: QuestionRequest ){
    return this.http.put('http://localhost:8080/api/questions/' + id, questionRequest);
  }

  getQuestionsByProductCode(productcode : string)
  {
    return this.http.get<Array<QuestionModel>>('http://localhost:8080/api/questions/productcode/' + productcode);
  }

  getQuestionsByStatement(statement : string){
    return this.http.get<Array<QuestionModel>>('http://localhost:8080/api/questions/statement/' + statement);
  }
  
  getQuestionsByUseremail(email : string){
    return this.http.get<QuestionModel[]>('http://localhost:8080/api/questions/useremail/' + email);
  }

  getQuestionsByLabel(label : string){
    return this.http.get<Array<QuestionModel>>('http://localhost:8080/api/questions/label/' + label);
  }

  getQuestionsByDate(date : string){
    return this.http.get<Array<QuestionModel>>('http://localhost:8080/api/questions/date/' + date);
  }
  
}
