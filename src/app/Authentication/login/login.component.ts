import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestSenderService } from '../../Services/request-sender.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private authService: RequestSenderService,private _router:Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
  
console.log(this.loginForm.value)
    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Call authentication service to log in
    this.authService.sendPost(this.loginForm.value,"admin/log-in")
      .subscribe(
        (response) => {
          // Login successful, redirect or perform other actions
          console.log(response)
          sessionStorage.setItem('authenticated', "true");
          sessionStorage.setItem('userData', JSON.stringify(response)); 
          this._router.navigateByUrl('/Dashboard')
        },
        error => {
          this.error = 'Invalid username or password';
        }
      );
  }
}
