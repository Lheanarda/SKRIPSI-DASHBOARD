import { Injectable } from '@angular/core';
import { Kecamatan } from '../model/kecamatan.model';

@Injectable({
  providedIn: 'root'
})
export class KecamatanService {

kecamatan:Kecamatan[]=[
  {
    kabupatenKODE:'33.08',
    kecamatanKODE:'33.08.02',
    kecamatanALAMAT:'Jl. Daranindra No.1, Borobudur, Magelang, Jawa Tengah 56553',
    kecamatanKET:'Borobudur merupakan sebuah kecamatan di Kabupaten Magelang.',
    kecamatanNAMA:'Kecamatan Borobudur'
  },
  {
    kabupatenKODE:'33.08',
    kecamatanKODE:'33.08.02',
    kecamatanALAMAT:'alan Serma Darmin No. 125, Sawangan (Jalan Blabak - Boyolali)',
    kecamatanKET:'Sawangan merupakan sebuah kecamatan di Kabupaten Magelang, Jawa Tengah.',
    kecamatanNAMA:'Kecamatan Sawangan'
  }
]

constructor() { }

}
