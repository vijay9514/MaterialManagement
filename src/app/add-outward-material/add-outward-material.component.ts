import { Component, OnInit } from '@angular/core';
import { MainURL } from '../configurls';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-add-outward-material',
  templateUrl: './add-outward-material.component.html',
  styleUrls: ['./add-outward-material.component.css']
})
export class AddOutwardMaterialComponent implements OnInit {
  baseUrl=MainURL.HostUrl
  outwardForm!: FormGroup;
  productData: any;
  productDataObject: any;
  productIds: any;
  productName: any;
  productPrice: any;
  productQuantity: any;
  totalProductPrice: any;
  ProductMasterList:any=[];
  inwordAllData: any;
  isDisabled: boolean = true;
  inwardTotalAmounts: any;
  paidAmount: any;
  deletedRecord: any;
  inwardAmount: any;
  total: any;
  inwardData: any;
  getRecordByData: any;
  isEditFlags: any;
  inwardId: any;
  constructor(private router:Router,public spinner: NgxSpinnerService,private ngxService: NgxUiLoaderService,private fb: FormBuilder,private toastor:ToastrService,private sharedservice:SharedService) {
    this.inwardId= sessionStorage.getItem("outwardId");
    this.isEditFlags=sessionStorage.getItem("buttonFlag")
    if(this.inwardId){
      this.getInwardById();
    }
   }
  base64Image: string | undefined;



  ngOnInit(): void {
    this.outwardForm = this.fb.group({
      outwardDate: ['', [Validators.required]],
      outwardTotleAmount: ['', [Validators.required]],
      outward_name:['',[Validators.required]],
      contactPersonName:['',[Validators.required]],
      contactMobileNo:['',[Validators.required]],
      baseInvoiceImage:['',[Validators.required]],
      quantity:['',[Validators.required]],
      prodQtyList: this.fb.array([]),
      paidAmount:['',Validators.required],
      remainingAmount:['',[Validators.required]]
      // createdOn:['',[Validators.required]],
      // updatedOn:['',[Validators.required]],
    
    });
    this.loadData()
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.base64Image = e.target?.result as string;
        this.convertToBase64()
      };

      reader.readAsDataURL(file);
     
    }
  
  }

  convertToBase64(): void {
  
    console.log(this.base64Image);
    // this.InwardForm.controls.baseInvoiceImage
    
      // this.InwardForm.controls['baseInvoiceImage'].setValue(this.base64Image);
      // this.InwardForm.controls['baseInvoiceImage'].patchValue(this.base64Image);
debugger
this.outwardForm.controls['baseInvoiceImage'].patchValue(this.base64Image);

}

loadData(): void {
  let url = `${this.baseUrl}/findAllProducts`;
  this.sharedservice.getData(url).subscribe(
    (data) => {
      this.productData = data['result'];
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}
getProductByIds(event: any): void {
  debugger;
  let id = event.target.value; // Use event.target.value to get the selected value
  let url = `${this.baseUrl}/productFindById/${id}`;
  this.sharedservice.getData(url).subscribe(
    (data) => {
      this.productDataObject = data.result;

      this.productIds=this.productDataObject.productId;
      this.productName=this.productDataObject.productName;
      this.productPrice=this.productDataObject.productPrice;
      // this.productQuantity = this.InwardForm.controls['quantity'].value;
      // this.totalProductPrice=this.productPrice*this.productQuantity
      

      console.log("sfksahfj", this.productDataObject);
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}
AddProductInOneList(){
  this.productQuantity = this.outwardForm.controls['quantity'].value;
  this.totalProductPrice=this.productPrice*this.productQuantity;

  let obj:any = {
    "productName":this.productName,
    "productId": this.productIds,
    "quantity": this.productQuantity,
    "total": this.totalProductPrice
  };
  
  this.ProductMasterList.push(obj);
  console.log("this is array",  this.ProductMasterList)
  const totalSum = this.ProductMasterList.reduce((acc:any, item:any) => acc + item.total, 0);
  this.outwardForm.controls['outwardTotleAmount'].patchValue(totalSum);
  // Empty the obj variable
  obj = {};
  
  
}
calculateRemainingAmount(){
  this.inwardTotalAmounts=this.outwardForm.controls['outwardTotleAmount'].value;
  this.paidAmount=this.outwardForm.controls['paidAmount'].value;
  const remainingAmount=this.inwardTotalAmounts-this.paidAmount
  this.outwardForm.controls['remainingAmount'].patchValue(remainingAmount)
}

  saveInward(){
    const prodQtyListArray = this.outwardForm.get('prodQtyList') as FormArray;

    // Clear existing controls if needed
    prodQtyListArray.clear();
    
    this.ProductMasterList.forEach((item:any) => {
      const control = this.fb.group({
        productName: [item.productName],
        productId: [item.productId],
        quantity: [item.quantity],
        total: [item.total],
        inwardDetailId:[item.inwardDetailId],
      });
    
      prodQtyListArray.push(control);
    });
    
    console.log('Form value after setting prodQtyList:', this.outwardForm.value);
this.inwordAllData=this.outwardForm.value
    let url = `${this.baseUrl}/addOutward`;
    this.sharedservice.insertSupplyerMaster(url,this.inwordAllData).subscribe(
      (data) => {
       this.toastor.success("Outward insert succefully")
  })
}
  


  getInwardById(){
    debugger
  let url = `${this.baseUrl}/getInwardById/${this.inwardId}`;
  this.sharedservice.getSupplyerIdRecord(url).subscribe((data: any) => {
    // console.log(data)
    this.inwardData=data;
    this.getRecordByData=this.inwardData.result;
    this.outwardForm.patchValue({
      outwardDate: this.getRecordByData.materialInwardModel.outwardDate,
     outwardTotleAmount: this.getRecordByData.materialInwardModel.outwardTotleAmount,
     outward_name:this.getRecordByData.materialInwardModel.outward_name,
      contactPersonName:this.getRecordByData.materialInwardModel.contactPersonName,
      contactMobileNo:this.getRecordByData.materialInwardModel.contactMobileNo,
      baseInvoiceImage:this.getRecordByData.materialInwardModel.baseInvoiceImage,
      quantity:this.getRecordByData.materialInwardModel.quantity,
      prodQtyList:this.getRecordByData.materialInwardModel.prodQtyList,
    
      paidAmount:this.getRecordByData.materialInwardModel.paidAmount,
      remainingAmount : this.getRecordByData.materialInwardModel.remainingAmount
})
console.log('sfksfsfasfsf',this.outwardForm.value)
  })
}
  deleteRow(id: number) {
    debugger;
    const index = this.ProductMasterList.findIndex((item: any) => item.productId === id);
    if (index !== -1) {
      // Store the deleted record before splicing it
      const deletedRecord = this.ProductMasterList[index];
  
      // Remove the item from the array
      this.ProductMasterList.splice(index, 1);
  
      // Now you can use the deletedRecord as needed
      console.log("Deleted Record:", deletedRecord);
debugger
this.inwardAmount=this.outwardForm.controls['outwardTotleAmount'].value;
this.total=this.inwardAmount-deletedRecord.total
this.outwardForm.controls['outwardTotleAmount'].patchValue(this.total)

    }
  }
  
}

