import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../Models/course';
import { RequestSenderService } from '../../Services/request-sender.service';
import { ServiceConstants } from '../../Services/service-constants';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrl: './course-update.component.css'
})
export class CourseUpdateComponent implements OnInit {
  errorMsg!:string;
CourseForm :FormGroup
course :Course = new Course();
cuurseId!:number;

constructor(private fb:FormBuilder,private htttpSender:RequestSenderService,private _router :Router,
  private route: ActivatedRoute
  ){
  this.CourseForm = this.fb.group({
    courseName: ['', [Validators.required, Validators.maxLength(50)]], // Example: Max length of 50 characters
    courseCode: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]+')]], // Example: Alphanumeric characters only
    courseLevel: ['', Validators.required],
    courseDescription: ['', [Validators.required, Validators.maxLength(200)]] // Example: Max length of 200 characters
  });
}

ngOnInit(): void {
 
  this.route.params.subscribe(params => {
    const id = params['id'];
    this.cuurseId=id;
    console.log('ID:', id);
  });
  this.getCourseById(this.cuurseId);

}

addCourse(){
  if(this.CourseForm.valid){
      
    console.log("Data",this.CourseForm.value)
    this.errorMsg='';

    // this.htttpSender.sendPost<Course>(this.CourseForm.value,ServiceConstants.addCoure)
    // .subscribe(
    //   ((next)=>{
    //     console.log(next)
    //     this.CourseForm.reset()
    //     this._router.navigateByUrl('Dashboard/course/details/'+next.courseId)
    //   }),
    //   ((err)=>{
    //     console.log(err)
    //   this.errorMsg=err
    //   })
    // )
  }else{
    this.CourseForm.markAllAsTouched()
  }

  
}

getCourseById(courseId: number): void {
  this.htttpSender.sendGet<Course>('admin/courses/' + courseId)
    .subscribe(
      (response) => {
        // Handle successful response
        console.log('Course:', response.body);

        this.course=response.body as Course;
        this.CourseForm.patchValue({
          courseName: [this.course.courseName], 
          courseCode: [this.course.courseCode],
          courseLevel: [this.course.courseLevel],
          courseDescription:[this.course.courseDescription]
        })
      },
      (error) => {
        // Handle error
        console.error('Error:', error);
      }
    );
}


}
