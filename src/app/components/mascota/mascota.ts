import { Component, DOCUMENT,inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo, faTrash, faPencil, faPlus, faPrint, faCircleXmark, faXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MascotasService } from '../../shared/services/mascotas-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-mascota',
  imports: [FontAwesomeModule, ReactiveFormsModule, NgClass],
  templateUrl: './mascota.html',
  styleUrl: './mascota.css'
})
export class Mascota implements OnInit{
  doc = inject(DOCUMENT);
  builder = inject(FormBuilder);
  frmMascotas : FormGroup;
  faInfo = faInfo; faTrash = faTrash; faPencil = faPencil; faPrint = faPrint; faCircleXmark = faCircleXmark; faPlus = faPlus; faSearch = faSearch;

  mascotas : any; //(new MascotaClass()).data;
  srvMascotas = inject(MascotasService)
  prev_page = 1;
  page = 1;
  per_page = 3;
  pages = [0];
  last_page : number = 0;
  mascota : any

constructor(){

          this.frmMascotas = this.builder.group({
              id: [0],
              nombre: [''],
              especie: [''],
              raza: [''],
              genero: [''],
              fechaNacimiento: [''],
              peso: [0],
              funcion:[0],

          });
}
  calcEdad (fechaNacimiento : string) {
    //hoy - fecha_nac
    const hoy = new Date();
    const fechaCumple = new Date(fechaNacimiento);
    const mes = hoy.getMonth() - fechaCumple.getMonth();
    let edad = hoy.getFullYear() - fechaCumple.getFullYear();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaCumple.getDate())){
      edad--;

    }
    return edad;
  }
  onNuevo(){
    this.frmMascotas.reset();
    this.frmMascotas.patchValue(
      {function : 0}
    )
  }
 
  onEditar(id : number) {
   // const mascota = this.mascotas.find((e : any)=> e.id == id ) ;

    this.srvMascotas.getMascota(id)
    .subscribe((data)=> {this.frmMascotas.setValue({

      id : Object(data).id,
      nombre : Object(data).nombre,
      especie : Object(data).especie,
      raza : Object(data).raza,
      genero : Object(data).genero,
      fechaNacimiento : Object(data).fechaNacimiento,
      peso : Object(data).peso,
      function : 1
    }
    )})
   
    // this.frmMascotas.setValue(mascota);
   
  }

  onEliminar(id : number){
    // alert("Eliminar mascota con id" + id)
    this.srvMascotas.deleteMascota(id)
      .subscribe(
        (data) => {
          console.log(data);
          //this.mascotas = data;
        }
      )
  }

  onInfo(id : number){

    this.calcEdad('2007/09/22')

    this.srvMascotas.getMascota(id) 
      .subscribe((data) => {
        this.mascota = data
        this.mascota.edad = this.calcEdad(Object(data).fechaNacimiento);
        console.log(data)
      })

    }
  

  onGuardar(){
    const datos = this.frmMascotas.value;
    console.log(datos);
    delete datos.functio;
    console.log(datos);

    if (datos.function ===0){
       this.srvMascotas.createMascota(datos)
      .subscribe((res) => console.log(res));
    } else {
       this.srvMascotas.updateMascota(datos.id, datos)
      .subscribe((res) => console.log(res));
    } 
  }

  onElementosPaginas(e : any){
    //console.log(e.target.value);
    this.per_page = e.target.value;

    this.onPaginar();
  }

  onPaginar(page : number = 1){
    this.srvMascotas.getMascotas(page, this.per_page)
    .subscribe(
      (data) => {
        this.mascotas = Object(data).data;
        this.last_page = Object(data).last,
        console.log(this.last_page)
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
  onPaginaClick(page : number){
    this.doc.getElementById("page"+this.prev_page)?.classList.remove('active')
    this.doc.getElementById("page"+page)?.classList.add('active');
    this.prev_page = page;
    this.srvMascotas.getMascotas(page, this.per_page)
  .subscribe(
    (data) => {
      this.mascotas = Object(data).data
    }
  )


  }
  ngOnInit(): void {
    
    this.page = 1;
    this.per_page = 5;
    this.onPaginar();
  }

}


