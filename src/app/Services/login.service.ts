import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{HttpClient} from "@angular/common/http"
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  loginusers(url:any,data: any): Observable<any> {
    debugger
    return this.http.post<any>(url,data);
  }
}
