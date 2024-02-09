import { Component, OnChanges } from '@angular/core';
import { ICanal } from '../../../models/canal';
import { CanalService } from '../../../services/canal.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-canal-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './canal-list.component.html',
  styleUrl: './canal-list.component.css'
})
export class CanalListComponent  implements OnChanges {
  canales: ICanal[]=[];
  canal!: ICanal;
  canalForm!: FormGroup;
  accion="REGISTRAR CANAL";

  constructor(private fb: FormBuilder,
    public canalservice:CanalService, 
    private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getAllCanales();
    this.canalForm = this.fb.group({
      descripcion: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges(): void {
    if (this.canal) {
      this.canalForm.patchValue({
        descripcion: this.canal.descripcion,
      });
    }
  }

  getAllCanales() {
    this.canalservice.getAllCanales().subscribe((canal: ICanal[])=>{
      if(canal){
        this.canales = canal;
      console.log(this.canales);
      }
      
    }) ;
  }

  

  deleteCanal(canal: ICanal) {
    console.log("se eliminará el canal con idcanal:", canal.idcanal);
    this.canalservice.DeleteCanal(canal.idcanal+"").subscribe({
      next: (response:any) => {
        console.log("Se eliminó el canal:");
        this.toastr.success("Se anuló el canal","INFO");
        this.getAllCanales();
      },
    });
  }

  onCreate() {
    this.canal = {
      idcanal: '0',
      descripcion: '',
      bActivo:1
    };
    this.resetCanalForm() ;
    this.accion="REGISTRAR CANAL";
    console.log(this.canal);
  }

  resetCanalForm() {
    this.canalForm.reset();
  }

  onEdit(canal: ICanal) {
    this.canal = canal;
    this.canalForm.setValue({
      descripcion:canal.descripcion
    });
    this.accion="ACTUALIZAR CANAL";
    console.log(this.canal);
  }
  
  actualizarcanal(){
    this.canal.descripcion=this.canalForm.get('descripcion')?.value;
  }

  onSubmit() {
    console.log("SUBMIT");
    if (this.canalForm.valid) {
      console.log("*****valid*****");
      this.actualizarcanal();
      console.log(this.canal);
      console.log(this.canalForm.value);
      //el campo tiene que ser tal cual muestra en la bd idcanal<>idCanal, no lo detecta
      if (this.canal?.idcanal==="0") {
        console.log("REGISTRAR CANAL");
        this.canalservice.CreateCanal(this.canal).
          subscribe({
            next: (response: any) => {
              this.getAllCanales();
              this.resetCanalForm();
              this.toastr.success("Se registró el canal","INFO");
            },
          });
      } else {
        console.log("ACTUALIZAR CANAL");
        this.canalservice.UpdateCanal(this.canal).
        subscribe({
          next: (response: any) => {
            this.getAllCanales();
            this.resetCanalForm();
            this.toastr.success("Se actualizó la empresa","INFO");
          },
        });
      }
      this.accion="REGISTRAR CANAL";

    } else {
      this.toastr.warning("Valide la información del canal","ALERTA");
      this.canalForm.markAllAsTouched();
      console.log(this.canal);
      console.log("markAllAsTouched");
    }
  }


}
