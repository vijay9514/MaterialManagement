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
  selector: 'app-staff-master-form',
  templateUrl: './staff-master-form.component.html',
  styleUrls: ['./staff-master-form.component.css']
})
export class StaffMasterFormComponent implements OnInit {
  baseUrl=MainURL.HostUrl
  AddStaffEmp!: FormGroup;
  staffId: any;
  isEditFlags:any;
  staffData: any;
  getRecordByData: any;

  constructor(private router:Router,public spinner: NgxSpinnerService,private ngxService: NgxUiLoaderService,private fb: FormBuilder,private toastor:ToastrService,private sharedservice:SharedService) { 
    this.staffId= sessionStorage.getItem("staffId");
    this.isEditFlags=sessionStorage.getItem("buttonFlag")
    if(this.staffId){
      this.getRecordById();
    }
   }
   ngOnDestroy(){
    sessionStorage.removeItem('staffId')
    sessionStorage.removeItem("buttonFlag");
      }

  ngOnInit(): void {
    this.AddStaffEmp = this.fb.group({
      empFirstName: ['', [Validators.required]],
      empMiddleName: ['', [Validators.required]],
      empLastName:['',[Validators.required]],
      designation:['',[Validators.required]],
      empImage:['',[Validators.required]],
     
  })
}

submitForm(form:FormGroup){
  
  if(this.isEditFlags=='true'){
    
      let url = `${this.baseUrl}/updateEmpStaff/${this.staffId}`;
      let obj={
        
      }
      
      const requestUpdate = form.value;
      requestUpdate.empId = this.staffId;
    //  const requestBody=requestUpdate.this.productId
      this.sharedservice.updateSupplyer(url, requestUpdate).subscribe((data: any) => {
        this.toastor.success("Employee staff update successfully")
        this.AddStaffEmp.reset();
        // this.router.navigateByUrl('layout/')
        this.router.navigateByUrl('/layout/staffMasterList')
        },
        (err: HttpErrorResponse) => {
          // console.error('API Error:', err);
          this.toastor.error("server side error")
          // this.router.navigateByUrl('/layout/home');
        })
      }
      else{
        debugger
        let url = `${this.baseUrl}/addEmpStaff`;
        const requestData = form.value;
        
        console.log('URL:', url);
        console.log('Request Data:', requestData);
        
        this.sharedservice.insertSupplyerMaster(url, requestData).subscribe((data: any) => {
          this.toastor.success("employee master inserted successfully")
          this.AddStaffEmp.reset();
          // this.router.navigateByUrl('layout/')
          this.router.navigateByUrl('/layout/staffMasterList')
          },
          (err: HttpErrorResponse) => {
            // console.error('API Error:', err);
            this.toastor.error("server side error")
            // this.router.navigateByUrl('/layout/home');
          })
      }
}
getRecordById(){
let url = `${this.baseUrl}/empStaffFindById/${this.staffId}`;
this.sharedservice.getSupplyerIdRecord(url).subscribe((data: any) => {
  // console.log(data)
  this.staffData=data;
  this.getRecordByData=this.staffData.result;
  this.AddStaffEmp.setValue({
    empFirstName: this.getRecordByData.empFirstName,
    empMiddleName: this.getRecordByData.empMiddleName,
    empLastName: this.getRecordByData.empLastName,
    designation: this.getRecordByData.designation,
    empImage: this.getRecordByData.empImage,


  
})
})
}


}
