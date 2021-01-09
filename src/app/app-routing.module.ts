import { LoginGuard } from './guard/login.guard';
import { FotoObyekComponent } from './pages/foto-obyek/foto-obyek.component';
import { FasilitasObyekComponent } from './pages/fasilitas-obyek/fasilitas-obyek.component';
import { JarakComponent } from './pages/jarak/jarak.component';
import { KegiatanComponent } from './pages/kegiatan/kegiatan.component';
import { WisataComponent } from './pages/wisata/wisata.component';
import { RegisterComponent } from './pages/register/register.component';
import { KecamatanComponent } from './pages/kecamatan/kecamatan.component';
import { LoginComponent } from './pages/login/login.component';
import { KategoriWisataComponent } from './pages/kategori-wisata/kategori-wisata.component';
import { KategoriBeritaComponent } from './pages/kategori-berita/kategori-berita.component';
import { KabupatenComponent } from './pages/kabupaten/kabupaten.component';
import { FasilitasComponent } from './pages/fasilitas/fasilitas.component';
import { BeritaComponent } from './pages/berita/berita.component';
import { LaporanComponent } from './pages/laporan/laporan.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const appRoutes:Routes=[
  {path:'',redirectTo:'/laporan', pathMatch:'full'},
  {path:'laporan', component:LaporanComponent, canActivate:[AuthGuard]},
  {path:'berita',component:BeritaComponent, canActivate:[AuthGuard]},
  {path:'fasilitas',component:FasilitasComponent, canActivate:[AuthGuard]},
  {path:'kabupaten',component:KabupatenComponent, canActivate:[AuthGuard]},
  {path:'kategori-berita', component:KategoriBeritaComponent, canActivate:[AuthGuard]},
  {path:'kategori-wisata',component:KategoriWisataComponent, canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent, canActivate:[LoginGuard]},
  {path:'kecamatan',component:KecamatanComponent, canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent, canActivate:[LoginGuard]},
  {path:'wisata',component:WisataComponent, canActivate:[AuthGuard]},
  {path:'kegiatan',component:KegiatanComponent, canActivate:[AuthGuard]},
  {path:'jarak',component:JarakComponent, canActivate:[AuthGuard]},
  {path:'fasilitas-obyek',component:FasilitasObyekComponent, canActivate:[AuthGuard]},
  {path:'foto-obyek',component:FotoObyekComponent, canActivate:[AuthGuard]},
]

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes,{useHash:true})
  ],
  exports:[
    RouterModule
  ],
  declarations:[]
})
export class AppRoutingModule{}
