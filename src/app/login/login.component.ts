import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainURL } from '../configurls';
import { LoginService } from '../Services/login.service';
import{HttpErrorResponse} from "@angular/common/http"
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  baseUrl=MainURL.HostUrl
  myForm!: FormGroup;

  constructor(private router:Router,public spinner: NgxSpinnerService,private ngxService: NgxUiLoaderService,private fb: FormBuilder,private loginservice:LoginService,private toastor:ToastrService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    
    });
  }
  // LoginUser(form: FormGroup){
  //   debugger
  //   let url=this.baseUrl +'/logIn';
  //   this.loginservice.loginusers(url,form.value).subscribe(
  //     (data:any) => {
  //       this.router.navigateByUrl('/layout')
  //     },
  //     (err:HttpErrorResponse) => { // error() method block
  //       // this.router.navigateByUrl('/layout')
  //     }
  //   )
  // }
  LoginUser(form: FormGroup) {
    let url = `${this.baseUrl}/logIn`;
    const requestData = form.value;
  
    console.log('URL:', url);
    console.log('Request Data:', requestData);
  
    this.loginservice.loginusers(url, requestData).subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.toastor.success("user login successfully")
        this.router.navigateByUrl('/layout');
      },
      (err: HttpErrorResponse) => {
        // console.error('API Error:', err);
        this.toastor.error("user is not valid")
        this.router.navigateByUrl('/layout/home');
      }
    );
  }
  
}
