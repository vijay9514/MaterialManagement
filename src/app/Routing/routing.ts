import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from '../login/login.component';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../home/home.component';
import { MasterMenuComponent } from '../master-menu/master-menu.component';
import { SupplyerMasterComponent } from '../supplyer-master/supplyer-master.component';
import { SupplerMasterFormComponent } from '../suppler-master-form/suppler-master-form.component';
import { InwardMasterComponent } from '../inward-master/inward-master.component';
import { InwardListComponent } from '../inward-list/inward-list.component';
import { MaterialMenusComponent } from '../material-menus/material-menus.component';
import { ProductMasterListComponent } from '../product-master-list/product-master-list.component';
import { Component } from '@angular/core';
import { AddproductMasterComponent } from '../addproduct-master/addproduct-master.component';
import { LocationmasterListComponent } from '../locationmaster-list/locationmaster-list.component';
import { LocationmasterFormComponent } from '../locationmaster-form/locationmaster-form.component';
import { StaffMasterListComponent } from '../staff-master-list/staff-master-list.component';
import { StaffMasterFormComponent } from '../staff-master-form/staff-master-form.component';
import { CompanyMasterListComponent } from '../company-master-list/company-master-list.component';
import { CompanyMasterFormComponent } from '../company-master-form/company-master-form.component';
import { OutwardListComponent } from '../outward-list/outward-list.component';
import { AddOutwardMaterialComponent } from '../add-outward-material/add-outward-material.component';
import { ReportsComponent } from '../reports/reports.component';
import { InwardReportComponent } from '../inward-report/inward-report.component';
import { OutwardReportComponent } from '../outward-report/outward-report.component';


const appRoutes: Routes=[
    {
        path:'',
        component:LoginComponent
    },
    {
        path:'layout',
        component:LayoutComponent,
        children: [
          {
            path: 'home',
            component: HomeComponent
          },
          {
            path:'masterMenu',
            component:MasterMenuComponent
          },
          {
            path:'supplyerMaster',
            component:SupplyerMasterComponent
          },
          {
          path:'AddSupplyer',
          component:SupplerMasterFormComponent
          },

          {
            path:'AddInward',
            component:InwardMasterComponent
            },
            {
              path:'inwardList',
              component:InwardListComponent
            },
            {
              path:'materialMenu',
              component:MaterialMenusComponent
            },
            {
              path:'productMasterList',
              component:ProductMasterListComponent
            },
            {
              path:'addProductMaster',
              component:AddproductMasterComponent
            },
            {
              path:'addLocation',
              component:LocationmasterFormComponent
            },
            {
              path:'locationMasterList',
              component:LocationmasterListComponent
            },
            {
              path:'staffMasterList',
              component:StaffMasterListComponent
            },
            {
              path:'staffMasterForm',
              component:StaffMasterFormComponent
            },
            {
              path:'companyMasterList',
              component:CompanyMasterListComponent
            },
            {
              path:'companyMasterForm',
              component:CompanyMasterFormComponent
            },
            {
              path:'outwarList',
              component:OutwardListComponent
            },
            {
              path:'addOutwardList',
              component:AddOutwardMaterialComponent
            },
            {
              path:'Reports',
              component:ReportsComponent
            },
            {
              path:'InwardReport',
              component:InwardReportComponent
            },
            {
              path:'OutwardReport',
              component:OutwardReportComponent
            }
        ]
    },
    {
        path:'**',redirectTo:'login'
    }
]


export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
