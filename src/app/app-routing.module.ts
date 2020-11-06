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

const appRoutes:Routes=[
  {path:'',redirectTo:'/laporan', pathMatch:'full'},
  {path:'laporan', component:LaporanComponent},
  {path:'berita',component:BeritaComponent},
  {path:'fasilitas',component:FasilitasComponent},
  {path:'kabupaten',component:KabupatenComponent},
  {path:'kategori-berita', component:KategoriBeritaComponent},
  {path:'kategori-wisata',component:KategoriWisataComponent},
  {path:'login',component:LoginComponent},
  {path:'kecamatan',component:KecamatanComponent},
  {path:'register',component:RegisterComponent},
  {path:'wisata',component:WisataComponent},
  {path:'kegiatan',component:KegiatanComponent},
  {path:'jarak',component:JarakComponent}
]

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ],
  declarations:[]
})
export class AppRoutingModule{}
