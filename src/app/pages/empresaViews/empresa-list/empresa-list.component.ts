import { Component } from '@angular/core';
import { IEmpresa } from '../../../models/empresa';
import { EmpresaService } from '../../../services/empresa.service';
import { ModalComponent } from '../../UtilitariosComponents/modal/modal.component';
import { EmpresaFormComponent } from '../empresa-form/empresa-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [ModalComponent,EmpresaFormComponent],
  templateUrl: './empresa-list.component.html',
  styleUrl: './empresa-list.component.css'
})
export class EmpresaListComponent {
  isModalOpen = false;
  empresas: IEmpresa[]=[];
  empresa!: IEmpresa;

  constructor(public empresaService:EmpresaService, private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getAllEmpresas();
  }

  getAllEmpresas() {
    this.empresaService.getAllEmpresas().subscribe((data: IEmpresa[])=>{
      if(data){
        this.empresas = data;
      console.log(this.empresas);
      }
      
    }) ;
  }

  loadEmpresa(empresa: IEmpresa) {
    this.openModal();
    this.empresa = empresa;
  }

  deleteEmpresa(empresa: IEmpresa) {
    this.empresaService.DeleteEmpresa(empresa.idEmpresa+"").subscribe({
      next: (response:any) => {
        this.toastr.success("Se anuló la empresa","INFO");
        this.getAllEmpresas();
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
    this.empresa = {
      idEmpresa: '0',
      nsucursal:0,
      ruc:'',
      nombre: '',
      descripcion: '',
      bestado:1
    };
  }

  closeModal() {
    this.isModalOpen = false;
    this.getAllEmpresas();
  }

}
