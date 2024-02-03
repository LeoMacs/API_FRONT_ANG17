import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmpresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl ="https://localhost:7257/api/Empresa";
  
  constructor(private http:HttpClient) { }

  getAllEmpresas():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  getEmpresa(id:string):Observable<any>{
    return this.http.get(this.apiUrl +"/"+id);
  }

  CreateEmpresa(empresa:IEmpresa):Observable<any>{
    return this.http.post(this.apiUrl, empresa);
  }

  UpdateEmpresa(empresa:IEmpresa):Observable<any>{
    return this.http.put(this.apiUrl, empresa);

  }

  DeleteEmpresa(idEmpresa:string):Observable<any>{
    return this.http.delete(this.apiUrl +"?idEmpresa="+idEmpresa);
  }


}
