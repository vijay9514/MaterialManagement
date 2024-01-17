import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from '../Services/shared.service';
import { MainURL } from '../configurls';

@Component({
  selector: 'app-inward-master',
  templateUrl: './inward-master.component.html',
  styleUrls: ['./inward-master.component.css']
})
export class InwardMasterComponent implements OnInit {
  baseUrl=MainURL.HostUrl
  InwardForm!: any;
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
  isEditButton:boolean=false;
  inwardData: any;
  getRecordByData: any;
  isEditFlags: any;
  inwardId: any;
  constructor(private router:Router,public spinner: NgxSpinnerService,private ngxService: NgxUiLoaderService,private fb: FormBuilder,private toastor:ToastrService,private sharedservice:SharedService) {
    this.inwardId= sessionStorage.getItem("inwardIds");
    this.isEditFlags=sessionStorage.getItem("buttonFlag")
    if(this.inwardId){
      this.getInwardById();
    }
   }
  base64Image: string | undefined;



  ngOnInit(): void {
    this.InwardForm = this.fb.group({
      inwardDate: ['', [Validators.required]],
      inwardTotleAmount: ['', [Validators.required]],
      inwardName:['',[Validators.required]],
      contactPersonName:['',[Validators.required]],
      contactMobileNo:['',[Validators.required]],
      baseInvoiceImage:['',[Validators.required]],
      quantity:['',[Validators.required]],
      prodQtyList: this.fb.array([]),
      paidAmount:['',Validators.required],
      remainingAmount:['',[Validators.required]],
      inwardId:['',[]]
      // inwardDetailId:['',]
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
this.InwardForm.controls['baseInvoiceImage'].patchValue(this.base64Image);

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
  this.productQuantity = this.InwardForm.controls['quantity'].value;
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
  this.InwardForm.controls['inwardTotleAmount'].patchValue(totalSum);
  // Empty the obj variable
  obj = {};
  
  
}
calculateRemainingAmount(){
  this.inwardTotalAmounts=this.InwardForm.controls['inwardTotleAmount'].value;
  this.paidAmount=this.InwardForm.controls['paidAmount'].value;
  const remainingAmount=this.inwardTotalAmounts-this.paidAmount
  this.InwardForm.controls['remainingAmount'].patchValue(remainingAmount)
}

  saveInward(){
    debugger
    const prodQtyListArray = this.InwardForm.get('prodQtyList') as FormArray;

    // Clear existing controls if needed
    prodQtyListArray.clear();
    
    // Iterate over the ProductMasterList and push new controls to the FormArray
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
    
    console.log('Form value after setting prodQtyList:', this.InwardForm.value);
this.inwordAllData=this.InwardForm.value
    let url = `${this.baseUrl}/addInward`;
    this.sharedservice.insertSupplyerMaster(url,this.inwordAllData).subscribe(
      (data) => {
       this.toastor.success("inward insert succefully")
  })
}
UpdateInward(){
  debugger
  const prodQtyListArray = this.InwardForm.get('prodQtyList') as FormArray;

  // Clear existing controls if needed
  prodQtyListArray.clear();
  
  // Iterate over the ProductMasterList and push new controls to the FormArray
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

  
  console.log('Form value after setting prodQtyList:', this.InwardForm.value);

this.inwordAllData=this.InwardForm.value
  let url = `${this.baseUrl}/updateInward/${this.inwardId}`;
  this.sharedservice.updateSupplyerData(url,this.inwordAllData).subscribe(
    (data) => {
     this.toastor.success("inward update succefully");
     this.isEditButton=false
    
})
}
  


  getInwardById(){
    this.isEditButton=true
    debugger
  let url = `${this.baseUrl}/getInwardById/${this.inwardId}`;
  this.sharedservice.getSupplyerIdRecord(url).subscribe((data: any) => {
    // console.log(data)
    this.inwardData=data;
    this.getRecordByData=this.inwardData.result;
    
debugger
    this.InwardForm.patchValue({
     inwardDate: this.getRecordByData.materialInwardModel.inwardDate,
      inwardTotleAmount: this.getRecordByData.materialInwardModel.inwardTotleAmount,
      inwardName:this.getRecordByData.materialInwardModel.inwardName,
      contactPersonName:this.getRecordByData.materialInwardModel.contactPersonName,
      contactMobileNo:this.getRecordByData.materialInwardModel.contactMobileNo,
      baseInvoiceImage:this.getRecordByData.materialInwardModel.baseInvoiceImage,
      quantity:this.getRecordByData.materialInwardModel.quantity,
      inwardId:this.inwardId,
      // inwardDetailId:this.getRecordByData.materialInwardModel.inwardDetailId,
      // prodQtyList:this.getRecordByData.materialInwardModel.prodQtyList,
    
      paidAmount:this.getRecordByData.materialInwardModel.paidAmount,
      remainingAmount : this.getRecordByData.materialInwardModel.remainingAmount
})
this.ProductMasterList=this.getRecordByData.materialInwardModel.prodQtyList;


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
this.inwardAmount=this.InwardForm.controls['inwardTotleAmount'].value;
this.total=this.inwardAmount-deletedRecord.total
this.InwardForm.controls['inwardTotleAmount'].patchValue(this.total)

    }
  }
  
}

