import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestSenderService } from '../../Services/request-sender.service';
import Swal from 'sweetalert2'



interface TimeSlot {
  id: number;
  time: string;
}

interface Day {
  id: number;
  name: string;
  timeSlots: TimeSlot[];
}

@Component({
  selector: 'app-createview-time-table',
  templateUrl: './createview-time-table.component.html',
  styleUrl: './createview-time-table.component.css'
})
export class CreateviewTimeTableComponent implements OnInit {

  lecture:any;
  lectureNo:any;
  subjectList:any[]=[];
  timeTable:any[]=[];

  times:TimeSlot[]=[
    {id:0, time:'08:00 - 09:00'},
    {id:1, time:'09:00 - 10:00'},
    {id:2, time:'10:00 - 11:00'},
    {id:3, time:'11:00 - 12:00'},
    {id:4, time:'12:00 - 13:00'},
    {id:5, time:'13:00 - 14:00'},
    {id:6, time:'14:00 - 15:00'},
    {id:7, time:'15:00 - 16:00'},
  ];
  days: Day[] = [
    { id: 0, name: 'Monday', timeSlots: [] =this.times },
    { id: 1, name: 'Tuesday', timeSlots: [] =this.times },
    { id: 2, name: 'Wednesday', timeSlots: []=this.times  },
    { id: 3, name: 'Thursday', timeSlots: [] =this.times },
    { id: 4, name: 'Friday', timeSlots: [] =this.times },
    { id: 5, name: 'Saturday', timeSlots: [] =this.times }
  ];
     Form :FormGroup;
  constructor(private fb:FormBuilder,private htttpSender:RequestSenderService,private _router :Router,
    private route: ActivatedRoute, private formBuilder: FormBuilder
    ){

      this.Form=this.formBuilder.group({
        staff:[],
        subjectsSlots: this.fb.array([])
      })
      
    }
    ngOnInit(): void {
 
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.lectureNo=id;
        console.log('ID:', id);
        this.GetUserById(this.lectureNo)
      });
     this.GetSubject(this.lectureNo);
     this.Form.patchValue({
      staff:this.lectureNo
     })
     this.getSubjectList()
    //  this.generateTimeSlots();

    
    }
    
    get subjectsSlots() {
      return this.Form.get('subjectsSlots') as FormArray;
    }
    
    GetUserById(id: number): void {
      this.htttpSender.sendGet<any>('admin/lecturer/' + id)
        .subscribe(
          (response) => {
            // Handle successful response
            console.log('data:', response.body);
    
            this.lecture=response.body;
         
          },
          (error) => {
            // Handle error
            console.error('Error:', error);
          }
        );
    }

    GetSubject(id: number): void {
      this.htttpSender.sendGet<any>('admin/all-user-subjects/' + id)
        .subscribe(
          (response) => {
            // Handle successful response
            console.log('data:', response.body);
    
            this.subjectList=response.body;
         
          },
          (error) => {
            // Handle error
            console.error('Error:', error);
          }
        );
    }
 
    addToFormArray(weekDayId: number, periodId: number, subject: any) {
      const subjectId =subject.target.value
      const existingEntryIndex = this.subjectsSlots.controls.findIndex(control => {
        const controlValue = control.value;
        return controlValue.weekDay === weekDayId && controlValue.period === periodId;
      });
    
      if (existingEntryIndex !== -1) {
        this.subjectsSlots.controls[existingEntryIndex].setValue({ weekDay: weekDayId, period: periodId, subject: subjectId });
      } else {
        this.subjectsSlots.push(this.formBuilder.group({ weekDays: weekDayId, period: periodId, subject: subjectId }));
      }
    }
    
   saveData(){
    console.log("Data",this.Form.value)

    
    this.htttpSender.sendPost(this.Form.value,'admin/createTimetable').subscribe(
      (res)=>{
        console.log(res);
        Swal.fire("Saved!", "", "success");

      },
      (error)=>{
        Swal.fire("Error!",error,"error");
      }
    )

   }
    
   getSubjectList(){
    this.htttpSender.sendGet<any>("lecture/timeTable/"+this.lectureNo).subscribe(
      (res)=>{
        this.timeTable = res.body;
        console.log(this.timeTable)
      
      }
    )
  }
}
