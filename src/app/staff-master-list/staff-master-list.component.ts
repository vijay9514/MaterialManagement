import { Component, OnInit,ViewChild } from '@angular/core';
import { MainURL } from '../configurls';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff-master-list',
  templateUrl: './staff-master-list.component.html',
  styleUrls: ['./staff-master-list.component.css']
})
export class StaffMasterListComponent implements OnInit {
  baseUrl=MainURL
  .HostUrl
  SupplyerForm: any;
  submitted = false;
  // displayedColumns: string[] = ['userId', 'id', 'title', 'body','Action'];
  displayedColumns: string[] = ['serialNumber','empFirstName','empMiddleName', 'empLastName','designation','empImage','Action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  suppyerIds: any;
  isEdit: any='false';
  productId: any;
  locationIds: any;
  empId: any;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router,private toastor:ToastrService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    debugger
    let url = `${this.baseUrl}/findAllEmpStaff`;
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
  this.empId=e.empId;
  sessionStorage.setItem("staffId",this.empId);
  sessionStorage.setItem("buttonFlag",this.isEdit)
  this.router.navigateByUrl('/layout/staffMasterForm')
  
  }
  deleteRow(){
  
  }
  deleteStaff(e:any){
    let empIds=e.empId
    let url = `${this.baseUrl}/deleteEmpStaffById/${empIds}`;
  this.http.delete(url).subscribe((data: any) => {
  this.toastor.success("employee staff  delete succefully")
    this.loadData()
  })
  }
}
