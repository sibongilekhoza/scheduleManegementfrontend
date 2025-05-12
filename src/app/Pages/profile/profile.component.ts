import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  

    stuff:any;
    ngOnInit(): void {
   this.stuff =this.getUserData()
      console.log(this.stuff)
      if(this.stuff==null){
        sessionStorage.clear();
      }
    }
  
  
  
    getUserData(): any {
      const userDataString = sessionStorage.getItem('userData');
      return userDataString ? JSON.parse(userDataString) : null;
    }
 
}
