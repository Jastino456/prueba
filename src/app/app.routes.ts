import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Doctor } from './components/doctor/doctor';
import { Mascota } from './components/mascota/mascota';
import { Citas } from './components/citas/citas';
import { Clientes } from './components/clientes/clientes';
import { Admin } from './components/admin/admin';

export const routes: Routes = [
    {path: 'home', component : Home},
    {path : 'doctor', component : Doctor},
    {path : 'mascota', component : Mascota },
    {path : 'cliente', component : Clientes},
    {path : 'admin', component : Admin},
    {path : 'citas', component : Citas},
];
