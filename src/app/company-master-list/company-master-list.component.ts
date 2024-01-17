import { Component, OnInit ,ViewChild} from '@angular/core';
import { MainURL } from '../configurls';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-master-list',
  templateUrl: './company-master-list.component.html',
  styleUrls: ['./company-master-list.component.css']
})
export class CompanyMasterListComponent implements OnInit {
  baseUrl=MainURL
  .HostUrl
  SupplyerForm: any;
  submitted = false;
  // displayedColumns: string[] = ['userId', 'id', 'title', 'body','Action'];
  displayedColumns: string[] = ['serialNumber','companyName','companyAddress', 'contactDetails','portalLink','Action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  suppyerIds: any;
  isEdit: any='false';
  productId: any;
  locationIds: any;
  compId: any;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router,private toastor:ToastrService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    debugger
    let url = `${this.baseUrl}/findAllCompanies`;
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
  this.compId=e.compId;
  sessionStorage.setItem("compId",this.compId);
  sessionStorage.setItem("buttonFlag",this.isEdit)
  this.router.navigateByUrl('/layout/companyMasterForm')
  
  }

  deleteStaff(e:any){
    let compIds=e.compId
    let url = `${this.baseUrl}/deleteCompanyById/${compIds}`;
  this.http.delete(url).subscribe((data: any) => {
  this.toastor.success("company  delete succefully")
    this.loadData()
  })
  }
}
