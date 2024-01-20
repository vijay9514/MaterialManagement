import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from '../Services/shared.service';
import { MainURL } from '../configurls';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-locationmaster-form',
  templateUrl: './locationmaster-form.component.html',
  styleUrls: ['./locationmaster-form.component.css']
})
export class LocationmasterFormComponent implements OnInit,OnDestroy {
  baseUrl=MainURL.HostUrl
  AddLocation!: FormGroup;
  locationId: string | null;
  isEditFlags: string | null;
  locationData: any;
  getRecordByData: any;

  constructor(private router:Router,public spinner: NgxSpinnerService,private ngxService: NgxUiLoaderService,private fb: FormBuilder,private toastor:ToastrService,private sharedservice:SharedService) { 
    this.locationId= sessionStorage.getItem("locationId");
    this.isEditFlags=sessionStorage.getItem("buttonFlag")
    if(this.locationId){
      this.getRecordById();
    }
   }
   ngOnDestroy(){
    sessionStorage.removeItem('locationId')
    sessionStorage.removeItem("buttonFlag");
      }
  ngOnInit(): void {
    this.AddLocation = this.fb.group({
      locationName: ['', [Validators.required]],
      locationCode: ['', [Validators.required]],
      locationContactPerson:['',[Validators.required]],
      locationEmailId:['',[Validators.required]],
      locationDesc:['',[Validators.required]],
     
  })
}

submitForm(form:FormGroup){
  
  if(this.isEditFlags=='true'){
    
      let url = `${this.baseUrl}/updateLocation/${this.locationId}`;
      let obj={
        
      }
      
      const requestUpdate = form.value;
      requestUpdate.locationId = this.locationId;
    //  const requestBody=requestUpdate.this.productId
      this.sharedservice.updateSupplyer(url, requestUpdate).subscribe((data: any) => {
        this.toastor.success("location master update successfully")
        this.AddLocation.reset();
        // this.router.navigateByUrl('layout/')
        this.router.navigateByUrl('/layout/locationMasterList')
        },
        (err: HttpErrorResponse) => {
          // console.error('API Error:', err);
          this.toastor.error("server side error")
          // this.router.navigateByUrl('/layout/home');
        })
      }
      else{
        debugger
        let url = `${this.baseUrl}/addLocation`;
        const requestData = form.value;
        
        console.log('URL:', url);
        console.log('Request Data:', requestData);
        
        this.sharedservice.insertSupplyerMaster(url, requestData).subscribe((data: any) => {
          this.toastor.success("location master inserted successfully")
          this.AddLocation.reset();
          // this.router.navigateByUrl('layout/')
          this.router.navigateByUrl('/layout/locationMasterList')
          },
          (err: HttpErrorResponse) => {
            // console.error('API Error:', err);
            this.toastor.error("server side error")
            // this.router.navigateByUrl('/layout/home');
          })
      }
}
getRecordById(){
let url = `${this.baseUrl}/locationFindById/${this.locationId}`;
this.sharedservice.getSupplyerIdRecord(url).subscribe((data: any) => {
  // console.log(data)
  this.locationData=data;
  this.getRecordByData=this.locationData.result;
  this.locationData.setValue({
    locationName: this.getRecordByData.locationName,
    locationCode: this.getRecordByData.locationCode,
    locationContactPerson: this.getRecordByData.locationContactPerson,
    locationEmailId: this.getRecordByData.locationEmailId,
    locationDesc: this.getRecordByData.locationDesc,
})
})
}


}
