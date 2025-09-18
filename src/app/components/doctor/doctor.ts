import { Component, DOCUMENT,inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo, faTrash, faPencil, faPlus, faPrint, faCircleXmark, faXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DoctoresService } from '../../shared/services/doctores-service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-doctor',
  imports: [FontAwesomeModule, ReactiveFormsModule, NgClass],
  templateUrl: './doctor.html',
  styleUrl: './doctor.css'
})
export class Doctor implements OnInit{
  doc = inject(DOCUMENT);
  builder = inject(FormBuilder);
  frmDoctores : FormGroup;
  faInfo = faInfo; faTrash = faTrash; faPencil = faPencil; faPrint = faPrint; faCircleXmark = faCircleXmark; faPlus = faPlus; faSearch = faSearch;
 
 
  doctores : any; //(new MascotaClass()).data;
    srvDoctores = inject(DoctoresService)
    prev_page = 1;
    page = 1;
    per_page = 3;
    pages = [0];
    last_page : number = 0;
    doctor : any

 constructor(){
  

        this.frmDoctores = this.builder.group({
         id: [0],
         nombre: [''],
         especialidad: [''],
         telefono : [''],
         correo: [''],

        });
  }
  onNuevo(){
    this.frmDoctores.reset();
    this.frmDoctores.patchValue(
      {function : 0}
    )
  }
  onEditar(id : number) {

    this.srvDoctores.getDoctor(id)
    .subscribe((data)=> {this.frmDoctores.setValue({

      id : Object(data).id,
      nombre : Object(data).nombre,
      especialidad : Object(data).especialidad,
      telefono : Object(data).telefono,
      correo : Object(data).correo,
      function : 1
    }
    )})
  }
  onEliminar(id : number){
    // alert("Eliminar doctor con id" + id)
    this.srvDoctores.deleteDoctor(id)
      .subscribe(
        (data) => {
          console.log(data);
          //this.Doctor = data;
        }
      )
  }

  onInfo(id : number){
    this.srvDoctores.getDoctor(id) 
      .subscribe((data) => {
        this.doctor = data
        console.log(data)
      })

    }

  onGuardar(){
      const datos = this.frmDoctores.value;
    console.log(datos);
    delete datos.functio;
    console.log(datos);

    if (datos.function ===0){
       this.srvDoctores.createDoctor(datos)
      .subscribe((res) => console.log(res));
    } else {
       this.srvDoctores.updateDoctor(datos.id, datos)
      .subscribe((res) => console.log(res));
    }     
  }
  onElementosPaginas(e : any){
    //console.log(e.target.value);
    this.per_page = e.target.value;
    this.onPaginar();
  }
  onPaginar(page : number = 1){ 
    this.srvDoctores.getDoctores(page, this.per_page)
    .subscribe(
      (data) => {
        this.doctores = Object(data).data;
        this.last_page = Object(data).last,
        this.pages.length = 0;
        for (let i = 1; i <= Object(data).pages; i++) {
          this.pages.push(i);
        }
      }
      
    )
    this.doc.getElementById("page"+this.prev_page)?.classList.remove('active')
    this.doc.getElementById("page1")?.classList.add('active');
    this.prev_page = 1;
  }
  onPaginaClick(page : number){
    this.doc.getElementById("page"+this.prev_page)?.classList.remove('active')
    this.doc.getElementById("page"+page)?.classList.add('active');
    this.prev_page = page;
    this.srvDoctores.getDoctores(page, this.prev_page)
  .subscribe(
    (data) => {
      this.doctores = Object(data).data
    }
  )


}
  onPaginarSig(){
    if (this.prev_page == this.last_page) {
      this.onPaginaClick(1);
    } else {
      this.onPaginaClick(this.prev_page + 1);
    }
  }
  onPaginarAnt(){
    if (this.prev_page == 1) {
      this.onPaginaClick(this.last_page);
    } else {
      this.onPaginaClick(this.prev_page - 1);
    }
  }

  ngOnInit(): void {
    this.page = 1;
    this.per_page = 5;
    this.onPaginar();
  }

}







 