import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICanal } from '../models/canal';

@Injectable({
  providedIn: 'root'
})
export class CanalService {

  apiUrl ="http://localhost:5088/";
  
  constructor(private http:HttpClient) { }

  getAllCanales():Observable<any>{
    return this.http.get(this.apiUrl+"Canal");
  }

  CreateCanal(canal:ICanal):Observable<any>{
    return this.http.post(this.apiUrl+"createCanal", canal);
  }

  UpdateCanal(canal:ICanal):Observable<any>{
    return this.http.put(this.apiUrl +"updateCanal", canal);
  }

  DeleteCanal(idCanal:string):Observable<any>{
    return this.http.delete(this.apiUrl +"deleteCanal/"+idCanal);
  }
}
