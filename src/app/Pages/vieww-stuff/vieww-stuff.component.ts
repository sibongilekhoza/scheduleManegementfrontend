import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestSenderService } from '../../Services/request-sender.service';

@Component({
  selector: 'app-vieww-stuff',
  templateUrl: './vieww-stuff.component.html',
  styleUrl: './vieww-stuff.component.css'
})
export class ViewwStuffComponent implements OnInit {

  lecture:any;
  lectureNo:any;
  subjectList:any[]=[];
     
  constructor(private fb:FormBuilder,private htttpSender:RequestSenderService,private _router :Router,
    private route: ActivatedRoute
    ){
      
    }
    ngOnInit(): void {
 
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.lectureNo=id;
        console.log('ID:', id);
        this.GetUserById(this.lectureNo)
      });
     this.GetSubject(this.lectureNo)
    
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
    
}
