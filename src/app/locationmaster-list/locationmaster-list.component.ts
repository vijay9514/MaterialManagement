import { Component, OnInit ,ViewChild} from '@angular/core';
import { MainURL } from '../configurls';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-locationmaster-list',
  templateUrl: './locationmaster-list.component.html',
  styleUrls: ['./locationmaster-list.component.css']
})
export class LocationmasterListComponent implements OnInit {
  baseUrl=MainURL
  .HostUrl
  SupplyerForm: any;
  submitted = false;
  // displayedColumns: string[] = ['userId', 'id', 'title', 'body','Action'];
  displayedColumns: string[] = ['serialNumber','locationName','locationCode', 'locationContactPerson','locationEmailId','locationDesc','Action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  suppyerIds: any;
  isEdit: any='false';
  productId: any;
  locationIds: any;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router,private toastor:ToastrService) { }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    debugger
    let url = `${this.baseUrl}/findAllLocation`;
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
  this.locationIds=e.locationId;
  sessionStorage.setItem("locationId",this.locationIds);
  sessionStorage.setItem("buttonFlag",this.isEdit)
  this.router.navigateByUrl('/layout/addLocation')
  
  }
  deleteRow(){
  
  }
  deleteproduct(e:any){
    let locationData=e.locationId
    let url = `${this.baseUrl}/deleteLocationById/${locationData}`;
  this.http.delete(url).subscribe((data: any) => {
  this.toastor.success("location  delete succefully")
    this.loadData()
  })
  }
}
