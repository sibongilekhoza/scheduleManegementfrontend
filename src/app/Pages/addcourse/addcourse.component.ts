import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestSenderService } from '../../Services/request-sender.service';
import { Course } from '../../Models/course';
import { ServiceConstants } from '../../Services/service-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrl: './addcourse.component.css'
})
export class AddcourseComponent {
  errorMsg!:string;
CourseForm :FormGroup
constructor(private fb:FormBuilder,private htttpSender:RequestSenderService,private _router :Router){
  this.CourseForm = this.fb.group({
    courseName: ['', [Validators.required, Validators.maxLength(50)]], // Example: Max length of 50 characters
    courseCode: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]+')]], // Example: Alphanumeric characters only
    courseLevel: ['', Validators.required],
    courseDescription: ['', [Validators.required, Validators.maxLength(200)]] // Example: Max length of 200 characters
  });
}

addCourse(){
  if(this.CourseForm.valid){
      
    console.log("Data",this.CourseForm.value)
    this.errorMsg='';

    this.htttpSender.sendPost<Course>(this.CourseForm.value,ServiceConstants.addCoure)
    .subscribe(
      ((next)=>{
        console.log(next)
        this.CourseForm.reset()
        this._router.navigateByUrl('Dashboard/course/details/'+next.courseId)
      }),
      ((err)=>{
        console.log(err)
      this.errorMsg=err
      })
    )
  }else{
    this.CourseForm.markAllAsTouched()
  }
}

}
