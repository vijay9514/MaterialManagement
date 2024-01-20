import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this
import { NgxUiLoaderModule ,NgxUiLoaderHttpModule} from 'ngx-ui-loader';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './Services/login.service';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { routing } from './Routing/routing';
import { MasterMenuComponent } from './master-menu/master-menu.component';
import { SupplyerMasterComponent } from './supplyer-master/supplyer-master.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { SupplerMasterFormComponent } from './suppler-master-form/suppler-master-form.component';
import { InwardMasterComponent } from './inward-master/inward-master.component';
import { InwardListComponent } from './inward-list/inward-list.component';
import { MaterialMenusComponent } from './material-menus/material-menus.component';
import { ProductMasterListComponent } from './product-master-list/product-master-list.component';
import { AddproductMasterComponent } from './addproduct-master/addproduct-master.component';
import { SharedService } from './Services/shared.service';
import { LocationmasterListComponent } from './locationmaster-list/locationmaster-list.component';
import { LocationmasterFormComponent } from './locationmaster-form/locationmaster-form.component';
import { StaffMasterListComponent } from './staff-master-list/staff-master-list.component';
import { StaffMasterFormComponent } from './staff-master-form/staff-master-form.component';
import { CompanyMasterListComponent } from './company-master-list/company-master-list.component';
import { CompanyMasterFormComponent } from './company-master-form/company-master-form.component';
import { OutwardListComponent } from './outward-list/outward-list.component';
import { AddOutwardMaterialComponent } from './add-outward-material/add-outward-material.component';
import { ReportsComponent } from './reports/reports.component';
import { InwardReportComponent } from './inward-report/inward-report.component';
import { OutwardReportComponent } from './outward-report/outward-report.component';
import { ProductReportComponent } from './product-report/product-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HomeComponent,
    DashboardComponent,
    MasterMenuComponent,
    SupplyerMasterComponent,
    SupplerMasterFormComponent,
    InwardMasterComponent,
    InwardListComponent,
    MaterialMenusComponent,
    ProductMasterListComponent,
    AddproductMasterComponent,
    LocationmasterListComponent,
    LocationmasterFormComponent,
    StaffMasterListComponent,
    StaffMasterFormComponent,
    CompanyMasterListComponent,
    CompanyMasterFormComponent,
    OutwardListComponent,
    AddOutwardMaterialComponent,
    ReportsComponent,
    InwardReportComponent,
    OutwardReportComponent,
    ProductReportComponent
  ],
  imports: [
    BrowserModule,
  MatTableModule,
  HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    RouterModule,
    MatPaginatorModule,
    MatDividerModule,
  
    routing,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
