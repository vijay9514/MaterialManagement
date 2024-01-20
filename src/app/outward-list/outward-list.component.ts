import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MainURL } from '../configurls';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outward-list',
  templateUrl: './outward-list.component.html',
  styleUrls: ['./outward-list.component.css']
})
export class OutwardListComponent implements OnInit {
  baseUrl=MainURL.HostUrl
  SupplyerForm: any;
  submitted = false;
  // displayedColumns: string[] = ['userId', 'id', 'title', 'body','Action'];
  displayedColumns: string[] = ['serialNumber','inwardName','inwardDate', 'inwardTotleAmount', 'contactPersonName', 'contactMobileNo'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  suppyerIds: any;
  isEdit: any='false';
  inwardIds: any;
  outwardsListId: any;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private zone: NgZone,private router:Router) { }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    debugger
    let url = `${this.baseUrl}/getAllOutwards`;
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
  this.outwardsListId=e.inwardId;
 
  sessionStorage.setItem("outwardId",this.outwardsListId);
  sessionStorage.setItem("buttonFlag",this.isEdit)
  this.router.navigateByUrl('/layout/addOutwardList')
  
  }
  deleteRow(){
  
  }
}
