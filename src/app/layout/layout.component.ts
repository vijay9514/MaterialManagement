import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  title = 'material-responsive-sidenav';
  
  
  constructor(private observer: BreakpointObserver,private router:Router) { }
  ngAfterViewInit() {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }
  ngOnInit(): void {
    // this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
    //   if(screenSize.matches){
    //     this.isMobile = true;
    //   } else {
    //     this.isMobile = false;
    //   }
    // });
  }
  // toggleMenu() {
  //   if(this.isMobile){
  //     this.sidenav.toggle();
  //     this.isCollapsed = false; // On mobile, the menu can never be collapsed
  //   } else {
  //     this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
  //     this.isCollapsed = !this.isCollapsed;
  //   }
  // }
  logout(){
    this.router.navigateByUrl("layout/login")
  }
}
