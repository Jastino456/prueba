import { HttpClient } from '@angular/common/http';
import { Injectable , inject} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {
  private apiURL = 'http://localhost:3000'

  http = inject(HttpClient)
    constructor(){
    this.getDoctores().subscribe((data) => console.log(data))
  }

  getDoctores(page : number = 1, per_page : number = 3){
    return this.http.get(`${this.apiURL}/doctores?_page=${page}&_per_page=${per_page}`);
  }
  getDoctor(id: number){
    return this.http.get(`${this.apiURL}/doctores/${id}`);
  }
  deleteDoctor(id : number){
    return this.http.delete(`${this.apiURL}/doctores/${id}`);

  }
  updateDoctor(id : number , data : any){
    delete data.function; 
    return this.http.put(`${this.apiURL}/doctores/ ${id}`, data) ; //put es actualizar con un id
    
  }   
  createDoctor(data : any){
    delete data.function;  
    return this.http.post(`${this.apiURL}/doctores/`, data)

  }


  
}
