import { resetFakeAsyncZone } from "@angular/core/testing";

export class MascotaClass {
    data : any;
    constructor(){
        this.data = [
            {
                id: 1,
                nombre : 'Gojo',
                especie : 'felino',
                raza : 'unkwon',
                genero : 'M',
                fechaNacimiento : '26-02-2024',
                peso : '18kg'
            },
            {
               id: 2,
                nombre : 'Sombra',
                especie : 'canino',
                raza : 'caniche',
                genero : 'M',
                fechaNacimiento : '09-02-2020',
                peso : '20kg' 
            },
            {
                id: 3,
                nombre : 'Goldy',
                especie : 'canino',
                raza : 'cruzado',
                genero : 'M',
                fechaNacimiento : '09-02-2023',
                peso : '28kg' 
            },
        ]

        
    }
}
