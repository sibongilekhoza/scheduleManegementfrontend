import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestSenderService } from '../../Services/request-sender.service';
import { Course } from '../../Models/course';
import { ServiceConstants } from '../../Services/service-constants';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrl: './student-add.component.css'
})
export class StudentAddComponent implements OnInit {
  Form :FormGroup
  errorMsg!:string;
  CourseList:Course[]=[];
  sujectList:any[]=[];


  subjects: any[] = [
    { id: 1, name: 'Math' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'History' },
    { id: 4, name: 'English' },
    { id: 5, name: 'Art' }
  ];
  constructor(private fb:FormBuilder,private htttpSender:RequestSenderService,private _router :Router,private route: ActivatedRoute){
    this.Form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]], 
      surname: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]+')]], 
      phone: ['', Validators.required,],
      email:['',[Validators.email,Validators.required]],
      coursedId: [''],
      id:[''],
      subjectId: this.fb.array([])
      
    });
  }

  ngOnInit(): void {
    this.loadCourses()
  }

  submit(){
  console.log(this.Form.value)
    this.errorMsg=""
  this.htttpSender.sendPost<Response>(this.Form.value,ServiceConstants.addStudent).subscribe(
    (response)=>{
      console.log(response)
      this.Form.reset();
      this._router.navigateByUrl('/Dashboard/student');
    },
    (error)=>{
      this.errorMsg=error
    }
  )
  }

    // Getter for easier access to the FormArray
    get subjectId() {
      return this.Form.get('subjectId') as FormArray;
    }
  
    toggleSelection(subjectId: number) {
      const index = this.subjectId.value.indexOf(subjectId);
      if (index !== -1) {
        this.subjectId.removeAt(index);
      } else {
        this.subjectId.push(this.fb.control(subjectId));
      }
    }

  loadCourses(){
    this.htttpSender.sendGet<Course[]>("admin/courses").subscribe(
      (response)=>{
        console.log(response.body)
        this.CourseList= response.body || []
        //this.dataSource=response.body as Course;
      }
    )
  }

  onSelectedCourse(e :any){
    this.htttpSender.sendGet<any>('admin/subject/'+e.target.value).subscribe(
      (response)=>{
        console.log(response.body)
        this.subjectId.clear()
        this.sujectList=response.body ||[];
      }
    )
  }
}
