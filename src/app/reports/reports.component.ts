import { Component, OnInit } from '@angular/core';
import { MainURL } from '../configurls';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  baseUrl=MainURL.HostUrl
  ReportForm!: any;
  selectedValue: any;
  constructor(private router:Router,public spinner: NgxSpinnerService,private ngxService: NgxUiLoaderService,private fb: FormBuilder,private toastor:ToastrService,private sharedservice:SharedService,private infoservice:InfoService) { }

  ngOnInit(): void {
    this.ReportForm = this.fb.group({
      ReportName: ['', [Validators.required]],
      fromDate:['',[Validators.required]],
      toDate:['',[Validators.required]]
    
    });
  }
  getProductByIds(e:any){
    this.selectedValue = this.ReportForm.get('ReportName').value;
   
  }
  GenerateReports(form:any){
    debugger
    if(this.selectedValue=='Inward Report'){
      let url = `${this.baseUrl}/getInwardReport`;
      const requestUpdate = form.value;
      this.sharedservice.getInwardReport(url, requestUpdate).subscribe((data: any) => {


        this.infoservice.changeMessage(JSON.stringify(data["result"]));
        this.toastor.success("report fetch successfully")
        this.ReportForm.reset();
        this.router.navigateByUrl('/layout/InwardReport')
       
        },
        (err: HttpErrorResponse) => {
         
          this.toastor.error("server side error")
        
        })
      
    
    }
   else if(this.selectedValue=='Outward Report'){
    let url = `${this.baseUrl}/getOutwardReport`;
    const requestUpdate = form.value;
    this.sharedservice.getInwardReport(url, requestUpdate).subscribe((data: any) => {


      this.infoservice.changeMessage(JSON.stringify(data["result"]));
      this.toastor.success("report fetch successfully")
      this.ReportForm.reset();
      this.router.navigateByUrl('/layout/OutwardReport')
     
      },
      (err: HttpErrorResponse) => {
       
        this.toastor.error("server side error")
      
      })
    
  
  
   }
   
    
  }
}
