import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestSenderService } from '../../Services/request-sender.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Subject } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-student-by-subject',
  templateUrl: './student-by-subject.component.html',
  styleUrl: './student-by-subject.component.css'
})
export class StudentBySubjectComponent implements OnInit {

  id:any
  studentList:any[]=[];
  Form:FormGroup;
  subject:any;

  constructor(private fb:FormBuilder,private route:ActivatedRoute, private _http:RequestSenderService,private toastrService: ToastrService){
    this.Form = this.fb.group({
      subjectId:[''],
      subjects: this.fb.array([])
      
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id=id;
      console.log('ID:', id);
      this.getStudent(id)
      this.getCourse(id)
    
    });
  }

  get subjects() {
    return this.Form.get('subjects') as FormArray;
  }
getStudent(id:any){
  this._http.sendGet<any>('admin/student-subjects/'+id).subscribe(
    (response)=>{
      this.studentList=response.body
      console.log(response.body)
    }
  )
}

getCourse(id:any){
  this._http.sendGet<any>('admin/subjects/'+id).subscribe(
    (res)=>{
      this.subject=res.body;
      console.log(this.subject)
    }
  )
}
toggleSelection(subjectId: number) {
  const index = this.subjects.value.indexOf(subjectId);
  if (index !== -1) {
    this.subjects.removeAt(index);
  } else {
    this.subjects.push(this.fb.control(subjectId));
  }
}

 submit(){
  this.Form.value.subjectId=this.id;
  console.log('Value',this.Form.value)
  this._http.sendPost(this.Form.value,'admin/Attendence').subscribe(
    (response)=>{
      this.toastrService.success('Reguster has been succesfully saved!', 'Successfully Saved!');
    },
    (err)=>{
      this.toastrService.error(err+'!', 'Error!');
    }
  )
   
  
 }

 generatePDF() {
  const students: any[]=this.studentList;
  const currentDate = new Date().toLocaleDateString();
  const sub = this.subject;
  const documentDefinition = {
    content: [
      { text: 'Student Register for '+sub.subjectName, fontSize: 18, bold: true, },
      { text: 'Course :'+sub.course, fontSize: 14, bold: true , },
      { text: `Date Generated: ${currentDate}` },
      {
        table: {
          headerRows: 1,
          widths: ['*', '*', '*','*'],
          body: [
            ['Student#', 'Name', 'Surname','Signature'],
            ...students.map(student => [student.studentNo, student.name, student.surname,""])
          ]
        }
        
      }
    ]
  };

  pdfMake.createPdf(documentDefinition).open();
}
}
