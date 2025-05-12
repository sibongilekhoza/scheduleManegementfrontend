import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Authentication/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { HomeComponent } from './Pages/home/home.component';
import { StudentComponent } from './Pages/student/student.component';
import { StuffComponent } from './Pages/stuff/stuff.component';
import { CourseComponent } from './Pages/course/course.component';
import { TimetableComponent } from './Pages/timetable/timetable.component';
import { AddcourseComponent } from './Pages/addcourse/addcourse.component';
import { CourseDetailsComponent } from './Pages/course-details/course-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseUpdateComponent } from './Pages/course-update/course-update.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StudentAddComponent } from './Pages/student-add/student-add.component';
import { StuffAddComponent } from './Pages/stuff-add/stuff-add.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ViewwStuffComponent } from './Pages/vieww-stuff/vieww-stuff.component';
import { StedentRegistrationComponent } from './Pages/stedent-registration/stedent-registration.component';
import { CreateviewTimeTableComponent } from './Pages/createview-time-table/createview-time-table.component';
import { StudentBySubjectComponent } from './Pages/student-by-subject/student-by-subject.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProfileComponent } from './Pages/profile/profile.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    StudentComponent,
    StuffComponent,
    CourseComponent,
    TimetableComponent,
    AddcourseComponent,
    CourseDetailsComponent,
    CourseUpdateComponent,
    StudentAddComponent,
    StuffAddComponent,
    ViewwStuffComponent,
    StedentRegistrationComponent,
    CreateviewTimeTableComponent,
    StudentBySubjectComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), 
    SweetAlert2Module.forRoot(),
    NgApexchartsModule,
    
  ],
  providers: [
    provideAnimationsAsync(),HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
