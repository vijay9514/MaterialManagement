import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-menus',
  templateUrl: './material-menus.component.html',
  styleUrls: ['./material-menus.component.css']
})
export class MaterialMenusComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  gotoPage1(){
    this.router.navigateByUrl('/layout/inwardList')
  }
  gotoPage2(){
    this.router.navigateByUrl('/layout/outwarList')
  }
  gotoPage3(){
    this.router.navigateByUrl('/layout/Reports')
  }
}
