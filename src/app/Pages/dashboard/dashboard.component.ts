import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestSenderService } from '../../Services/request-sender.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

   constructor(private _router :Router,private httpSender:RequestSenderService){
  
    }

     stuff:any;
  ngOnInit(): void {
 this.stuff =this.getUserData()
    console.log(this.stuff)
    if(this.stuff==null){
      sessionStorage.clear();
    }
    if(this.stuff.role =="Admin")
    {
      this.navList = [
            {label:'Dashboard',icon:'fa-solid fa-gauge' ,route:'/Dashboard/home'},
    // {label:'Notice Board',icon:'fa-solid fa-newspaper',route:'Blogs' },
    {label:'Lecture',icon:'fa-solid fa-users',route:'/Dashboard/stuff'},
    {label:'Students', icon:'fa-solid fa-user-group',route:'/Dashboard/student'},
    {label:'Timetable',icon:'fa-solid fa-calendar-days',route:'/Dashboard/timetable'},
    {label:'Courses',icon:'fa-solid fa-graduation-cap',route:'/Dashboard/course' },
    {label:'Profile', icon:'fa-solid fa-user',route:'/Dashboard/profile'},
      ]
    }
  }

  navList:any[]=[
    {label:'Dashboard',icon:'fa-solid fa-gauge' ,route:'/Dashboard/home'},
    // {label:'Notice Board',icon:'fa-solid fa-newspaper',route:'Blogs' },
    // {label:'Lecture',icon:'fa-solid fa-users',route:'/Dashboard/stuff'},
    // {label:'Students', icon:'fa-solid fa-user-group',route:'/Dashboard/student'},
    // {label:'Timetable',icon:'fa-solid fa-calendar-days',route:'/Dashboard/timetable'},
    // {label:'Courses',icon:'fa-solid fa-graduation-cap',route:'/Dashboard/course' },
    {label:'Profile', icon:'fa-solid fa-user',route:'/Dashboard/profile'},
    // {label:'Settings', icon:'fa-solid fa-sliders',route:'settings'},
    // {label:'Support',icon:'fa-solid fa-circle-info',route:'support'}
  ]

  getUserData(): any {
    const userDataString = sessionStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }
  logout(){

    sessionStorage.clear();
    this._router.navigateByUrl('login')
  }

}
