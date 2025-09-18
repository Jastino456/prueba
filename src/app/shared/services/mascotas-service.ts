import { HttpClient } from '@angular/common/http';
import { inject,Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
    private apiURL = 'http://localhost:3000'

    http = inject(HttpClient) 
    constructor(){
      this.getMascotas().subscribe((data) => console.log(data))
    }
    
    getMascotas(page : number = 1, per_page : number = 3){
      return this.http.get(`${this.apiURL}/mascotas?_page=${page}&_per_page=${per_page}`);
    }
    getMascota(id: number){
      return this.http.get(`${this.apiURL}/mascotas/${id}`);
    }
    deleteMascota(id : number){
      return this.http.delete(`${this.apiURL}/mascotas/${id}`);

    }
    updateMascota(id : number , data : any){
      delete data.function; 
      return this.http.put(`${this.apiURL}/mascotas/ ${id}`, data) ; //put es actualizar con un id
      
    }
    createMascota(data : any){
      delete data.function;  
      return this.http.post(`${this.apiURL}/mascotas/`, data)

    }
    
  }
