import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../../Models/course';
import { RequestSenderService } from '../../Services/request-sender.service';
import Swal from 'sweetalert2'

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})


export class CourseComponent implements OnInit {

  CourseList:Course[]=[];
  constructor(private _http: RequestSenderService){

  }
  displayedColumns: string[] = [ 'courseCode','courseName',  'courseLevel','Action']; // Adjust as needed
  dataSource: Course[] = [];


  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  ngOnInit(): void {
     this.loadCourses()
  }



  loadCourses(){
    this._http.sendGet<Course[]>("admin/courses").subscribe(
      (response)=>{
        console.log(response.body)
        this.CourseList= response.body || []
        this.dataSource = this.CourseList;
        //this.dataSource=response.body as Course;
      }
    )
  }

  deleteCourse(id:any){
    Swal.fire({
      title: "Are you sure u wanna Delete this Course?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._http.deleteItem<void>("admin/courseDelete", id).subscribe(() => {
          console.log('Item deleted successfully');
            Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        this.loadCourses()
        }, error => {
          console.error('Error deleting item:', error);
        });
      
      }
    });

 
  }
  
}
