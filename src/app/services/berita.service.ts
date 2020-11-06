import { Berita } from './../model/berita.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BeritaService {
beritas:Berita[]=[
  {
    beritaKODE:'2017.10.001',
    beritaJUDUL:'Mengapa Orang Jawa Tengah Andal Mengolah Masakan Kambing?',
    beritaGAMBAR:'https://craftlog.com/m/i/5213695=s1280=h960',
    beritaISI:'lorem ipsum',
    beritaSUMBER:"travel.kompas.com, 31 Agustus 2016",
    beritaTGL:new Date(),
    kabupatenKODE:'KB01',
    kategoriberitaKODE:'FS01',
    eventKODE:null
  }
];
constructor() { }

}
