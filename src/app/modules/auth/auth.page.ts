import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  authForm : FormGroup = new FormGroup({
    username: new FormControl(''),
    pwd: new FormControl(''),
  });

  constructor(
    private FormBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthService
  ) {
    this.authForm = this.FormBuilder.group({
      username: ['', Validators.required],
      pwd: ['', Validators.required],
    });

  }

  ngOnInit() {
  }

  submit(){
    const userObj: any = {
      username: this.authForm.value.username,
      pwd: this.authForm.value.pwd,
    }
    this._authService.login(userObj).subscribe(
      (res: any) => {
          this.setActiveUser();
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', Number(res.id).toString());
          this.router.navigate(['/home/contacts']);
        }
      );
  }

  setActiveUser(){
    const userObj: any = {
      username: this.authForm.value.username,
      isOnline: true
    }
    this._authService.setOnline(userObj).subscribe(
      (res: any) => {
        console.log(res);
      }
    ).unsubscribe();
  }

}
