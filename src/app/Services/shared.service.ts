import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }
  insertSupplyerMaster(url:any,data: any): Observable<any> {
  
    return this.http.post<any>(url,data);
  }
  updateSupplyerData(url:any,data: any): Observable<any> {
  
    return this.http.put<any>(url,data);
  }
  getSupplyerIdRecord(url:any):Observable<any>{
    return this.http.get<any>(url);
  }
  getInwardReport(url:any,data:any):Observable<any>{
    return this.http.post<any>(url,data);
  }
  getProduct(url:any):Observable<any>{
    return this.http.get<any>(url);
  }
  updateSupplyer(url:any,data:any):Observable<any>{
    return this.http.put<any>(url,data);
  }
  deleterecord(url:any):Observable<any>{
    return this.http.delete<any>(url)
  }
  getData(url:any):Observable<any>{
    return this.http.get<any>(url)
  }
}
