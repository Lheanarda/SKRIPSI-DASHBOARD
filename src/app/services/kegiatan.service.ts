import { Kegiatan } from './../model/kegiatan.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KegiatanService {

kegiatans:Kegiatan[]=[
  {
    eventKODE:'K001',
    eventNAMA:'Lomba Desain Wisata',
    eventKET:'Lomba merancang denah pariwisata yang berada di Kabupaten Magelang',
    eventMULAI:new Date(),
    eventSELESAI:new Date(),
    eventPOSTER:'https://www.rtikbojonegoro.or.id/wp-content/uploads/2019/11/bojonegoro-creative-festival-740x740.jpeg'
  }
]
constructor() { }

}
