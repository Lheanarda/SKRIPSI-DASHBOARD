import { FormBeritaComponent } from './components/form-berita/form-berita.component';
import { JarakComponent } from './pages/jarak/jarak.component';
import { FormWisataComponent } from './components/form-wisata/form-wisata.component';
import { FormKecamatanComponent } from './components/form-kecamatan/form-kecamatan.component';
import { FormFasilitasComponent } from './components/form-fasilitas/form-fasilitas.component';
import { FormKategoriWisataComponent } from './components/form-kategori-wisata/form-kategori-wisata.component';
import { FormKategoriBeritaComponent } from './components/form-kategori-berita/form-kategori-berita.component';
import { FormKegiatanComponent } from './components/form-kegiatan/form-kegiatan.component';
import { KegiatanComponent } from './pages/kegiatan/kegiatan.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { FormKabupatenComponent } from './components/form-kabupaten/form-kabupaten.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { KategoriWisataComponent } from './pages/kategori-wisata/kategori-wisata.component';
import { WisataComponent } from './pages/wisata/wisata.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LaporanComponent } from './pages/laporan/laporan.component';
import { KecamatanComponent } from './pages/kecamatan/kecamatan.component';
import { KategoriBeritaComponent } from './pages/kategori-berita/kategori-berita.component';
import { KabupatenComponent } from './pages/kabupaten/kabupaten.component';
import { FasilitasComponent } from './pages/fasilitas/fasilitas.component';
import { BeritaComponent } from './pages/berita/berita.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './materials.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ChartsModule } from 'ng2-charts';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BeritaComponent,
    FasilitasComponent,
    KabupatenComponent,
    KategoriBeritaComponent,
    KecamatanComponent,
    LaporanComponent,
    LoginComponent,
    RegisterComponent,
    WisataComponent,
    KategoriWisataComponent,
    ListTableComponent,
    FormKabupatenComponent,
    DialogDeleteComponent,
    KegiatanComponent,
    FormKegiatanComponent,
    FormKategoriBeritaComponent,
    FormKategoriWisataComponent,
    FormFasilitasComponent,
    FormKecamatanComponent,
    FormWisataComponent,
    JarakComponent,
    FormBeritaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,
    MaterialModule,
    AppRoutingModule,
    ChartsModule,
    NgxMatNativeDateModule,
    FormsModule
  ],
  entryComponents:[
    FormFasilitasComponent,
    FormKabupatenComponent,
    FormKategoriBeritaComponent,
    FormKategoriWisataComponent,
    FormKegiatanComponent,
    DialogDeleteComponent,
    FormKecamatanComponent,
    FormWisataComponent,
    FormBeritaComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
