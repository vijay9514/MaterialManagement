import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MainURL } from '../configurls';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-master-list',
  templateUrl: './product-master-list.component.html',
  styleUrls: ['./product-master-list.component.css']
})
export class ProductMasterListComponent implements OnInit {
  baseUrl=MainURL.HostUrl
  SupplyerForm: any;
  submitted = false;
  // displayedColumns: string[] = ['userId', 'id', 'title', 'body','Action'];
  displayedColumns: string[] = ['serialNumber','productName','productPrice', 'productDescription','Action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  suppyerIds: any;
  isEdit: any='false';
  productId: any;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private zone: NgZone,private router:Router,private toastor:ToastrService) { }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    debugger
    let url = `${this.baseUrl}/findAllProducts`;
    this.http.get(url).subscribe((data:any) => {
      debugger
      this.dataSource = data['result'];
      console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
    });
  }
  editRow(e:any){
    debugger
    this.isEdit='true'
  this.productId=e.productId;
  sessionStorage.setItem("productId",this.productId);
  sessionStorage.setItem("buttonFlag",this.isEdit)
  this.router.navigateByUrl('/layout/addProductMaster')
  
  }
  deleteRow(){
  
  }
  deleteproduct(e:any){
    let productIdse=e.productId
    let url = `${this.baseUrl}/deleteProductById/${productIdse}`;
  this.http.delete(url).subscribe((data: any) => {
  this.toastor.success("product delete succefully")
    this.loadData()
  })
  }
}
