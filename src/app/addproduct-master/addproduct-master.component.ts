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
  selector: 'app-addproduct-master',
  templateUrl: './addproduct-master.component.html',
  styleUrls: ['./addproduct-master.component.css']
})
export class AddproductMasterComponent implements OnInit {
  baseUrl=MainURL.HostUrl
  AddProductForm!: FormGroup;
  isEditFlags: any;
  supplyerId: any;
  supplyerData: any;
  supplyerRecordById: any;
  productId: any;
  productData: any;
  getRecordByData: any;
  constructor(private router:Router,public spinner: NgxSpinnerService,private ngxService: NgxUiLoaderService,private fb: FormBuilder,private toastor:ToastrService,private sharedservice:SharedService) {
    this.productId= sessionStorage.getItem("productId");
    this.isEditFlags=sessionStorage.getItem("buttonFlag")
    if(this.productId){
      this.getRecordById();
    }
   }

  ngOnInit(): void {
    this.AddProductForm = this.fb.group({
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      productDescription:['',[Validators.required]],
     
  })
}

submitForm(form:FormGroup){
  debugger
  if(this.isEditFlags=='true'){
    
      let url = `${this.baseUrl}/updateProduct/${this.productId}`;
      let obj={
        
      }
      
      const requestUpdate = form.value;
      requestUpdate.productId = this.productId;
    //  const requestBody=requestUpdate.this.productId
      this.sharedservice.updateSupplyer(url, requestUpdate).subscribe((data: any) => {
        this.toastor.success("product master update successfully")
        this.AddProductForm.reset();
        // this.router.navigateByUrl('layout/')
        this.router.navigateByUrl('/layout/productMasterList')
        },
        (err: HttpErrorResponse) => {
          // console.error('API Error:', err);
          this.toastor.error("server side error")
          // this.router.navigateByUrl('/layout/home');
        })
      }
      else{
        debugger
        let url = `${this.baseUrl}/addProduct`;
        const requestData = form.value;
        
        console.log('URL:', url);
        console.log('Request Data:', requestData);
        
        this.sharedservice.insertSupplyerMaster(url, requestData).subscribe((data: any) => {
          this.toastor.success("product master inserted successfully")
          this.AddProductForm.reset();
          // this.router.navigateByUrl('layout/')
          this.router.navigateByUrl('/layout/productMasterList')
          },
          (err: HttpErrorResponse) => {
            // console.error('API Error:', err);
            this.toastor.error("server side error")
            // this.router.navigateByUrl('/layout/home');
          })
      }
  

}
getRecordById(){
let url = `${this.baseUrl}/productFindById/${this.productId}`;
this.sharedservice.getSupplyerIdRecord(url).subscribe((data: any) => {
  console.log(data)
  this.productData=data;
  this.getRecordByData=this.productData.result;
  this.AddProductForm.setValue({
    productName: this.getRecordByData.productName,
    productPrice: this.getRecordByData.productPrice,
    productDescription: this.getRecordByData.productDescription,
   
    // other properties...
  });
})
}

}
