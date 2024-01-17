import { Component, OnInit } from '@angular/core';
import { MainURL } from '../configurls';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-company-master-form',
  templateUrl: './company-master-form.component.html',
  styleUrls: ['./company-master-form.component.css']
})
export class CompanyMasterFormComponent implements OnInit {
  baseUrl=MainURL.HostUrl
  AddCompany!: FormGroup;
  compId: any;
  isEditFlags:any;
  compData: any;
  getRecordByData: any;

  constructor(private router:Router,public spinner: NgxSpinnerService,private ngxService: NgxUiLoaderService,private fb: FormBuilder,private toastor:ToastrService,private sharedservice:SharedService) { 
    this.compId= sessionStorage.getItem("compId");
    this.isEditFlags=sessionStorage.getItem("buttonFlag")
    if(this.compId){
      this.getRecordById();
    }
   }

  ngOnInit(): void {
    this.AddCompany = this.fb.group({
      companyName: ['', [Validators.required]],
      companyAddress: ['', [Validators.required]],
      contactDetails:['',[Validators.required]],
      portalLink:['',[Validators.required]],
     
     
  })
}

submitForm(form:FormGroup){
  
  if(this.isEditFlags=='true'){
    
      let url = `${this.baseUrl}/updateCompany/${this.compId}`;
      let obj={
        
      }
      
      const requestUpdate = form.value;
      requestUpdate.compId = this.compId;
    //  const requestBody=requestUpdate.this.productId
      this.sharedservice.updateSupplyer(url, requestUpdate).subscribe((data: any) => {
        this.toastor.success("company master update successfully")
        this.AddCompany.reset();
        // this.router.navigateByUrl('layout/')
        this.router.navigateByUrl('/layout/companyMasterList')
        },
        (err: HttpErrorResponse) => {
          // console.error('API Error:', err);
          this.toastor.error("server side error")
          // this.router.navigateByUrl('/layout/home');
        })
      }
      else{
        debugger
        let url = `${this.baseUrl}/addCompany`;
        const requestData = form.value;
        
        console.log('URL:', url);
        console.log('Request Data:', requestData);
        
        this.sharedservice.insertSupplyerMaster(url, requestData).subscribe((data: any) => {
          this.toastor.success("company master inserted successfully")
          this.AddCompany.reset();
          // this.router.navigateByUrl('layout/')
          this.router.navigateByUrl('/layout/companyMasterList')
          },
          (err: HttpErrorResponse) => {
            // console.error('API Error:', err);
            this.toastor.error("server side error")
            // this.router.navigateByUrl('/layout/home');
          })
      }
}
getRecordById(){
  debugger
let url = `${this.baseUrl}/companyFindById/${this.compId}`;
this.sharedservice.getSupplyerIdRecord(url).subscribe((data: any) => {
  // console.log(data)
  this.compData=data;
  this.getRecordByData=this.compData.result;
  this.AddCompany.setValue({
    companyName: this.getRecordByData.companyName,
    companyAddress: this.getRecordByData.companyAddress,
    contactDetails: this.getRecordByData.contactDetails,
    portalLink: this.getRecordByData.portalLink,
   


  
})
})
}


}
