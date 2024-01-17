import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainURL } from '../configurls';
import { SharedService } from '../Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-suppler-master-form',
  templateUrl: './suppler-master-form.component.html',
  styleUrls: ['./suppler-master-form.component.css']
})
export class SupplerMasterFormComponent implements OnInit {
  baseUrl=MainURL.HostUrl
  supplyerForm!: FormGroup;
  isEditFlags: string | null;
  supplyerId: string | null;
  supplyerData: any;
  supplyerRecordById: any;
  constructor(private router:Router,public spinner: NgxSpinnerService,private ngxService: NgxUiLoaderService,private fb: FormBuilder,private toastor:ToastrService,private sharedservice:SharedService) {

   this.supplyerId= sessionStorage.getItem("supplyerid");
this.isEditFlags=sessionStorage.getItem("buttonFlag")
if(this.supplyerId){
  this.getRecordById();
}
   }

  ngOnInit(): void {
    this.supplyerForm = this.fb.group({
      supplierName: ['', [Validators.required]],
      supplierCompanyName: ['', [Validators.required]],
      contactPerson:['',[Validators.required]],
      contactMobileNo:['',[Validators.required]],
      address:['',[Validators.required]],
      city:['',[Validators.required]],
      status:['',[Validators.required]],
      // createdOn:['',[Validators.required]],
      // updatedOn:['',[Validators.required]],
      contactEmail:['',[Validators.required]]
    });
  }
  SaveSupplyer(form:FormGroup){
    if(this.isEditFlags=='true'){
      
        let url = `${this.baseUrl}/updateSupplier/${this.supplyerId}`;
        const requestUpdate = form.value;
        requestUpdate.supplierId = this.supplyerId;
        this.sharedservice.updateSupplyer(url, requestUpdate).subscribe((data: any) => {
          this.toastor.success("Supplyer master update successfully")
          this.supplyerForm.reset();
          // this.router.navigateByUrl('layout/')
          this.router.navigateByUrl('/layout/supplyerMaster')
          },
          (err: HttpErrorResponse) => {
            // console.error('API Error:', err);
            this.toastor.error("server side error")
            // this.router.navigateByUrl('/layout/home');
          })
        }
        else{
          let url = `${this.baseUrl}/addSupplier`;
          const requestData = form.value;
          
          console.log('URL:', url);
          console.log('Request Data:', requestData);
          
          this.sharedservice.insertSupplyerMaster(url, requestData).subscribe((data: any) => {
            this.toastor.success("Supplyer master inserted successfully")
            this.supplyerForm.reset();
            // this.router.navigateByUrl('layout/')
            this.router.navigateByUrl('/layout/supplyerMaster')
            },
            (err: HttpErrorResponse) => {
              // console.error('API Error:', err);
              this.toastor.error("server side error")
              // this.router.navigateByUrl('/layout/home');
            })
        }
    

}
getRecordById(){
  let url = `${this.baseUrl}/supplierFindById/${this.supplyerId}`;
  this.sharedservice.getSupplyerIdRecord(url).subscribe((data: any) => {
    console.log(data)
    this.supplyerData=data;
    this.supplyerRecordById=this.supplyerData.result;
    this.supplyerForm.setValue({
      supplierName: this.supplyerRecordById.supplierName,
      supplierCompanyName: this.supplyerRecordById.supplierCompanyName,
      contactPerson: this.supplyerRecordById.contactPerson,
      contactMobileNo: this.supplyerRecordById.contactMobileNo,
      address: this.supplyerRecordById.address,
      city: this.supplyerRecordById.city,
      status: this.supplyerRecordById.status,
      contactEmail: this.supplyerRecordById.contactEmail,
      // other properties...
    });
})
}


getstatus(e:any){

}
}
