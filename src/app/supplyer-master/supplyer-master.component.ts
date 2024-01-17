
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { MainURL } from '../configurls';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
var   $:any
@Component({
  selector: 'app-supplyer-master',
  templateUrl: './supplyer-master.component.html',
  styleUrls: ['./supplyer-master.component.css']
})
export class SupplyerMasterComponent implements OnInit {
  baseUrl=MainURL.HostUrl
  SupplyerForm: any;
  submitted = false;
  // displayedColumns: string[] = ['userId', 'id', 'title', 'body','Action'];
  displayedColumns: string[] = ['serialNumber','supplierName', 'supplierCompanyName', 'address', 'contactMobileNo', 'action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  suppyerIds: any;
  isEdit: any='false';

  

  constructor(private formBuilder:FormBuilder,private http:HttpClient,private zone: NgZone,private router:Router,private toastor:ToastrService) { }

  ngOnInit(): void {
    
   this.loadData();
}
loadData() {
  debugger
  let url = `${this.baseUrl}/findAllSuppliers`;
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
this.suppyerIds=e.supplierId;
sessionStorage.setItem("supplyerid",this.suppyerIds);
sessionStorage.setItem("buttonFlag",this.isEdit)
this.router.navigateByUrl('/layout/AddSupplyer')

}
deleteRow(){

}
deleteproduct(e:any){
  let supplyerIds=e.supplierId
  let url = `${this.baseUrl}/deleteSupplierById/${supplyerIds}`;
this.http.delete(url).subscribe((data: any) => {
this.toastor.success("supplyer delete succefully")
  this.loadData()
})
}
}
// $('.modal').on('hidden.bs.modal', function() {
//   $('.modal-backdrop').removeClass('show'); //this
//   $('.modal-backdrop').remove(); //or
// })
