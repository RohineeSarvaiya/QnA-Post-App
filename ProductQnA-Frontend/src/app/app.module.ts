import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateQuestionComponent } from './Components/create-question/create-question.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ViewQuestionComponent } from './Components/view-question/view-question.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { SortPipe } from './Pipes/sort.pipe';



@NgModule({
  declarations: [
    AppComponent,
    CreateQuestionComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ViewQuestionComponent,
    UserProfileComponent,
    SortPipe,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule
  ],

  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
