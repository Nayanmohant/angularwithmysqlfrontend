import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface User{
  id:number;
  name:string;
  email:string;
  gender:string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    // private Api='http://localhost:4000'
     private Api='https://angularwithmysql-3.onrender.com'


  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.Api}/getusers`)
  }

  addUsers(user:User):Observable<any[]>{
    return this.http.post<any>(`${this.Api}/addusers`,user)
  }

  deleteusers(id:number):Observable<any>{
    return this.http.delete(`${this.Api}/deleteusers/${id}`)
  }

  edituser(id:number,user:User):Observable<any>{
    return this.http.put<User>(`${this.Api}/edituser/${id}`,user)
  }

}
