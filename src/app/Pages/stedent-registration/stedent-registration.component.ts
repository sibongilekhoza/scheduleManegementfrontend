import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestSenderService } from '../../Services/request-sender.service';

@Component({
  selector: 'app-stedent-registration',
  templateUrl: './stedent-registration.component.html',
  styleUrl: './stedent-registration.component.css'
})
export class StedentRegistrationComponent {
  
  student:any;
  id:any;
  subjectList:any[]=[];
     
  constructor(private fb:FormBuilder,private htttpSender:RequestSenderService,private _router :Router,
    private route: ActivatedRoute
    ){
      
    }
    ngOnInit(): void {
 
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.id=id;
        console.log('ID:', id);
        this.GetUserById(this.id)
      });
     //this.GetSubject(this.lectureNo)
    
    }
    
 
    
    GetUserById(id: number): void {
      this.htttpSender.sendGet<any>('admin/student/' + id)
        .subscribe(
          (response) => {
            // Handle successful response
            console.log('data:', response.body);
    
            this.student=response.body;
         
          },
          (error) => {
            // Handle error
            console.error('Error:', error);
          }
        );
    }

    // GetSubject(id: number): void {
    //   this.htttpSender.sendGet<any>('admin/all-user-subjects/' + id)
    //     .subscribe(
    //       (response) => {
    //         // Handle successful response
    //         console.log('data:', response.body);
    
    //         this.subjectList=response.body;
         
    //       },
    //       (error) => {
    //         // Handle error
    //         console.error('Error:', error);
    //       }
    //     );
    // }
    
}
