import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { HomeComponent } from './Pages/home/home.component';
import { StudentComponent } from './Pages/student/student.component';
import { StuffComponent } from './Pages/stuff/stuff.component';
import { CourseComponent } from './Pages/course/course.component';
import { TimetableComponent } from './Pages/timetable/timetable.component';
import { AddcourseComponent } from './Pages/addcourse/addcourse.component';
import { CourseDetailsComponent } from './Pages/course-details/course-details.component';
import { CourseUpdateComponent } from './Pages/course-update/course-update.component';
import { StudentAddComponent } from './Pages/student-add/student-add.component';
import { StuffAddComponent } from './Pages/stuff-add/stuff-add.component';
import { ViewwStuffComponent } from './Pages/vieww-stuff/vieww-stuff.component';
import { StedentRegistrationComponent } from './Pages/stedent-registration/stedent-registration.component';
import { CreateviewTimeTableComponent } from './Pages/createview-time-table/createview-time-table.component';
import { authGuard } from './Guard/auth.guard';
import { StudentBySubjectComponent } from './Pages/student-by-subject/student-by-subject.component';
import { ProfileComponent } from './Pages/profile/profile.component';

const routes: Routes = [
  {path:'',redirectTo:'Dashboard',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'Dashboard',component:DashboardComponent,canActivateChild:[authGuard],
    children:[
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',component:HomeComponent},
      {path:'home/studentRegister/:id',component:StudentBySubjectComponent},
      {path:'student',component:StudentComponent},
      {path:'stuff',component:StuffComponent},
      {path:'course',component:CourseComponent},
      {path:'timetable',component:TimetableComponent},
      {path:'course/add',component:AddcourseComponent},
      {path:'course/details/:id',component:CourseDetailsComponent},
      {path:'course/update/:id',component:CourseUpdateComponent},
      {path:'student/add', component:StudentAddComponent},
      {path:'stuff/add',component:StuffAddComponent},
      {path:'student/details/:id', component:StedentRegistrationComponent},
      {path:'stuff/details/:id',component:ViewwStuffComponent},
      {path:'timetable/view/:id',component:CreateviewTimeTableComponent},
      {path: "profile", component:ProfileComponent}

      
      
    ]    
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
