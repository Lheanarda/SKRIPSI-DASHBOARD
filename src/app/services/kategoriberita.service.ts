import { KategoriBerita } from './../model/kategori-berita.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KategoriberitaService {

kategoris:KategoriBerita[]=[
  {
    kategoriberitaKODE:'KB01',
    kategoriberitaNAMA:'Tourism News (Berita Wisata)',
    kategoriberitaKET:'Merupakan kategori berita yang berhubungan dengan informasi kegiatan atau lainnya yang berada di obyek wisata'
  },
  {
    kategoriberitaKODE:'KB02',
    kategoriberitaNAMA:'Activity News (Berita Kegiatan)',
    kategoriberitaKET:'Merupakan kategori berita yang berhubungan dengan event atau kejadian atau kegiatan yang berlangsung tetapi tidak dilakukan berhubungan dengan obyek wisata'
  }
]
constructor() { }

}
