import { HttpClient } from '@angular/common/http';
import { inject,Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
    private apiURL = 'http://localhost:3000'

  http = inject(HttpClient) 
  constructor(){
    this.getClientes().subscribe((data) => console.log(data))
  }
  
  getClientes(page : number = 1, per_page : number = 3){
    return this.http.get(`${this.apiURL}/clientes?_page=${page}&_per_page=${per_page}`);
  }
  getCliente(id: number){
    return this.http.get(`${this.apiURL}/clientes/${id}`);
  }
  deleteCliente(id : number){
    return this.http.delete(`${this.apiURL}/clientes/${id}`);

  }
  updateCliente(id : number , data : any){
    delete data.function; 
    return this.http.put(`${this.apiURL}/clientes/ ${id}`, data) ; //put es actualizar con un id
    
  }
  createCliente(data : any){
    delete data.function;  
    return this.http.post(`${this.apiURL}/clientes/`, data)

  }
  
}


