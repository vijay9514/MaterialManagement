import { Component, OnInit, ViewChild } from '@angular/core';
import { MainURL } from '../configurls';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-inward-list',
  templateUrl: './inward-list.component.html',
  styleUrls: ['./inward-list.component.css']
})
export class InwardListComponent implements OnInit {
  baseUrl=MainURL.HostUrl
  SupplyerForm: any;
  submitted = false;
  // displayedColumns: string[] = ['userId', 'id', 'title', 'body','Action'];
  displayedColumns: string[] = ['serialNumber','inwardName','inwardDate', 'inwardTotleAmount', 'contactPersonName', 'contactMobileNo','action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  suppyerIds: any;
  isEdit: any='false';
  inwardIds: any;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private zone: NgZone,private router:Router) { }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    debugger
    let url = `${this.baseUrl}/getAllInwards`;
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
  this.inwardIds=e.inwardId;
 
  sessionStorage.setItem("inwardIds",this.inwardIds);
  sessionStorage.setItem("buttonFlag",this.isEdit)
  this.router.navigateByUrl('/layout/AddInward')
  
  }
  deleteRow(){
  
  }
}
