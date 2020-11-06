import { KategoriWisata } from './../model/kategori-wisata.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KategoriwisataService {

kategoris:KategoriWisata[]=[
  {
    kategoriKODE:'KW01',
    kategoriNAMA:'Cultural Heritage (Warisan Budaya)',
    kategoriKET:'Peninggalan atau warisan (heritage) merupakan konsep yang luas mencakup warisan yang bersifat alamiah, asli dan merupakan sejarah atau budaya kita.',
    kategoriREFERENCE:'ICOMOS, 2002'
  },
  {
    kategoriKODE:'KW02',
    kategoriKET:'Jenis wisata budaya yang sedang populer, karena  banyak orang yang semakin mengembangkan spiritualitas mereka sendiri dan untuk menemukan hal yang lainnya. ',
    kategoriNAMA:'Spiritual Tourism (Wisata Rohani)',
    kategoriREFERENCE:'https://www.igi-global.com/dictionary/spiritual-tourism/39292'
  }
]

constructor() { }

}
