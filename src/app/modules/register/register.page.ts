import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  regForm : FormGroup = new FormGroup({
    nombre: new FormControl(''),
    username: new FormControl(''),
    pwd: new FormControl(''),
  });

  constructor(
    private FormBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router,

  ) {
    this.regForm = this.FormBuilder.group({
      nombre: [''],
      username: [''],
      pwd: [''],
    });

  }

  ngOnInit() {
  }


  submit(){
    const newUser: any = {
      nombre: this.regForm.value.nombre,
      username: this.regForm.value.username,
      pwd: this.regForm.value.pwd,
      isOnline: false,
    }
    this._authService.register(newUser).subscribe(

      (res: any) => {
        console.log("paso");
        this.router.navigate(['']);
      }
    );
  }
}
