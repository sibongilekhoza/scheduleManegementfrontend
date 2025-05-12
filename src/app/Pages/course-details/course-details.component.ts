import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../Models/course';
import { RequestSenderService } from '../../Services/request-sender.service';
import { ServiceConstants } from '../../Services/service-constants';
import { Subject } from 'rxjs';
import { Module } from '../../Models/module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {

  displayedColumns: string[] = ['code', 'name', 'level', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  errorMsg!:string;
  isUpdate:boolean=false;
  bntText="Save"
  header="Add New Subject"
  cuurseId!:number;
  course :Course = new Course();
  subjectList :any;
 
  
Form :FormGroup
constructor(private fb:FormBuilder,private htttpSender:RequestSenderService,private _router :Router,private route: ActivatedRoute){
  this.Form = this.fb.group({
    subjectName: ['', [Validators.required, Validators.maxLength(50)]], 
    subjectCode: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]+')]], 
    subjectLevel: ['', Validators.required],
    courseId: [''],
    id:['']
    
  });
}
ngOnInit(): void {
  this.route.params.subscribe(params => {
    const id = params['id'];
    this.cuurseId=id;
    console.log('ID:', id);
  });
  this.getCourseById(this.cuurseId);
  this.onSelectedCourse()
}
update(data:any){
  this.isUpdate=true;
  this.bntText="Update"
  this.header="Update Course"
  this.Form.patchValue({
    subjectName: [data.subjectName], 
    subjectCode: [data.subjectCode], 
    subjectLevel: [data.subjectLevel],
    courseId: [data.courseId],
    id:[data.id]
  })
}
subject(){
  if(this.Form.valid){
      
    console.log("Data",this.Form.value)
    this.errorMsg='';
    let subject :Module =this.Form.value
    subject.courseId=this.cuurseId;
    if(this.isUpdate){

    }else{
      this.send(subject,ServiceConstants.addModule)
      console.log("Form",subject)
    }


  
  }else{
    this.Form.markAllAsTouched()
  }
}
send(body:any,url:string){
  this.htttpSender.sendPost<Module>(body,url)
  .subscribe(
    ((next)=>{
      console.log(next)
      this.Form.reset()
      this.Form.value.subjectCode='';
     // this._router.navigateByUrl('Dashboard/course/details/'+next.courseId)
     this.onSelectedCourse()
    }),
    ((err)=>{
      console.log(err)
    this.errorMsg=err
    })
  )
}
getCourseById(courseId: number): void {
  this.htttpSender.sendGet<Course>('admin/courses/' + courseId)
    .subscribe(
      (response) => {
        // Handle successful response
        console.log('Course:', response.body);

        this.subjectList =response.body?.subjectList
        this.course=response.body as Course;
      },
      (error) => {
        // Handle error
        console.error('Error:', error);
      }
    );
}

onSelectedCourse(){
  this.htttpSender.sendGet<any>('admin/subject/'+this.cuurseId).subscribe(
    (response)=>{
      console.log(response.body)

      this.subjectList=response.body ||[];
      this.dataSource = new MatTableDataSource(this.subjectList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  )
}

delete(subject:any){
  Swal.fire({
    title: "Are you sure u wanna Subject Name : "+subject.subjectName + " Code "+subject.subjectCode,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.htttpSender.deleteItem<void>("admin/subjectDelete", subject.id).subscribe(() => {
        console.log('Item deleted successfully');
          Swal.fire({
        title: "Deleted!",
        text: "Subject  Record has been deleted.",
        icon: "success"
      });
      this.onSelectedCourse()
      }, error => {
        console.error('Error deleting item:', error);
      });
    
    }
  });


}

}
