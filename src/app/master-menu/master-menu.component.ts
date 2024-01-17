import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-menu',
  templateUrl: './master-menu.component.html',
  styleUrls: ['./master-menu.component.css']
})
export class MasterMenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  gotoPage(){
    this.router.navigateByUrl('/layout/supplyerMaster')
  }
  gotoPage1(){
    this.router.navigateByUrl('/layout/productMasterList')
  }
  gotoPage2(){
    this.router.navigateByUrl('/layout/locationMasterList')
  }
  gotoPage3(){
    this.router.navigateByUrl('/layout/staffMasterList')
  }
  gotoPage4(){
    this.router.navigateByUrl('/layout/companyMasterList')
  }
}
