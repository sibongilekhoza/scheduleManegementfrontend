import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestSenderService } from '../../Services/request-sender.service';
import { Course } from '../../Models/course';
import { ServiceConstants } from '../../Services/service-constants';

@Component({
  selector: 'app-stuff-add',
  templateUrl: './stuff-add.component.html',
  styleUrl: './stuff-add.component.css'
})
export class StuffAddComponent implements OnInit {
  Form :FormGroup
  errorMsg!:string;
  CourseList:Course[]=[];
  sujectList:any[]=[];

  constructor(private fb:FormBuilder,private htttpSender:RequestSenderService,private _router :Router,private route: ActivatedRoute){
    this.Form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]], 
      surname: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]+')]], 
      phone: ['', Validators.required,],
      email:['',[Validators.email,Validators.required]],
      id:[''],
      password:['',Validators.required],
      subjects: this.fb.array([])
      
    });
  }

  ngOnInit(): void {
   this.loadsubject();
  }

  submit(){
  console.log(this.Form.value)
    this.errorMsg=""
  this.htttpSender.sendPost<Response>(this.Form.value,ServiceConstants.addStuff).subscribe(
    (response)=>{
      console.log(response)
      this.Form.reset();
      this._router.navigateByUrl('/Dashboard/stuff');
    },
    (error)=>{
      this.errorMsg=error
    }
  )
  }

    // Getter for easier access to the FormArray
    get subjects() {
      return this.Form.get('subjects') as FormArray;
    }
  
    toggleSelection(subjectId: number) {
      const index = this.subjects.value.indexOf(subjectId);
      if (index !== -1) {
        this.subjects.removeAt(index);
      } else {
        this.subjects.push(this.fb.control(subjectId));
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

  loadsubject(){
    this.htttpSender.sendGet<any>('admin/subject').subscribe(
      (response)=>{
        console.log(response.body)
        this.subjects.clear()
        this.sujectList=response.body ||[];
      }
    )
  }
}
