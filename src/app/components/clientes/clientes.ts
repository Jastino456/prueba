import { Component, DOCUMENT,inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo, faTrash, faPencil, faPlus, faPrint, faCircleXmark, faXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from '../../shared/services/clientes-service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-clientes',
  imports: [FontAwesomeModule, ReactiveFormsModule, NgClass],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit{
  doc = inject(DOCUMENT);
  builder = inject(FormBuilder);
  frmClientes : FormGroup;
  faInfo = faInfo; faTrash = faTrash; faPencil = faPencil;
  faPrint = faPrint; faCircleXmark = faCircleXmark; faPlus = faPlus; faSearch = faSearch; 



  clientes : any; //(new MascotaClass()).data;
      srvClientes = inject(ClientesService)
      prev_page = 1;
      page = 1;
      per_page = 3;
      pages = [0];
      last_page : number = 0;
      cliente : any;

 constructor(){
        this.frmClientes = this.builder.group({
         id: [0],
         nombre: [''],
         direccion: [''],
         telefono : [0],
         correo: [''],
         funcion:[0],
        });
  }
 
  onNuevo(){
    this.frmClientes.reset();
    this.frmClientes.patchValue(
      {function : 0}
    )
}

  onEditar(id : number) {
    this.srvClientes.getCliente(id)
    .subscribe((data)=> {this.frmClientes.setValue({

      id : Object(data).id,
      nombre : Object(data).nombre,
      direccion : Object(data).direccion,
      telefono : Object(data).telefono,
      correo : Object(data).correo,
      function : 1
    }
    )})
}

  onEliminar(id : number) {
        this.srvClientes.deleteCliente(id)
      .subscribe(
        (data) => {
          console.log(data);
          
        }
      )
}

  onInfo(id : number) {
   this.srvClientes.getCliente(id) 
      .subscribe((data) => {
        this.cliente = data
        console.log(data)
      })
}
  onGuardar() {
    const datos = this.frmClientes.value;
      console.log(datos);
    delete datos.functio;
      console.log(datos);

    if (datos.function === 0){
       this.srvClientes.createCliente(datos)
      .subscribe((res) => console.log(res));
    } else {
       this.srvClientes.updateCliente(datos.id, datos)
      .subscribe((res) => console.log(res));
    } 

}
  onElementosPaginas(e : any){
    //console.log(e.target.value);
    this.per_page = e.target.value;

    this.onPaginar();
}
  onPaginar(page : number = 1){
    this.srvClientes.getClientes(page, this.per_page)
    .subscribe(
      (data) => {
        this.clientes = Object(data).data;
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
    this.srvClientes.getClientes(page, this.per_page)
  .subscribe(
    (data) => {
      this.clientes = Object(data).data
    }
  )
}
  ngOnInit(): void {
    
    this.page = 1;
    this.per_page = 5;
    this.onPaginar();
}


























}