import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IEmpresa } from '../../../models/empresa';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../../services/empresa.service';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './empresa-form.component.html',
  styleUrl: './empresa-form.component.css'
})
export class EmpresaFormComponent implements OnChanges {

  @Input() data: IEmpresa = {
    idEmpresa: '0',
    nsucursal:0,
    ruc:'',
    nombre: '',
    descripcion: '',
    bestado:1
  };
  @Output() onCloseModal = new EventEmitter();

  empresaForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private empresaService: EmpresaService,
    private toastr: ToastrService){
      
  } 

  ngOnInit(): void {
    this.empresaForm = this.fb.group({
      ruc: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
    });

    

  }


  onClose() {
    this.onCloseModal.emit(false);
  }


  ngOnChanges(): void {
    if (this.data) {
      this.empresaForm.patchValue({
        ruc: this.data.ruc,
        nombre: this.data.nombre,
        descripcion: this.data.descripcion,
      });
    }
  }

  actualizarData(){
    this.data.ruc= this.empresaForm.get('ruc')?.value ;
    this.data.nombre=this.empresaForm.get('nombre')?.value;
    this.data.descripcion=this.empresaForm.get('descripcion')?.value;
  }


  onSubmit() {
    console.log("SUBMIT");
    if (this.empresaForm.valid) {
      console.log("*****valid*****");
      this.actualizarData();
      console.log(this.data);
      console.log(this.empresaForm.value);
      
      if (this.data?.idEmpresa==="0") {
        console.log("REGISTRAR");
        this.empresaService.CreateEmpresa(this.data).
          subscribe({
            next: (response: any) => {
              this.resetEmployeeForm();
              this.toastr.success("Se registró la empresa","INFO");
            },
          });
      } else {
        console.log("ACTUALIZAR");
        this.empresaService.UpdateEmpresa(this.data).
        subscribe({
          next: (response: any) => {
            this.resetEmployeeForm();
            this.toastr.success("Se actualizó la empresa","INFO");
          },
        });
      }
    } else {
      this.toastr.warning("Valide la información de la empresa","ALERTA");
      this.empresaForm.markAllAsTouched();
      console.log(this.data);
      console.log("markAllAsTouched");
    }
  }

  resetEmployeeForm() {
    this.empresaForm.reset();
    this.onClose();
  }

}
