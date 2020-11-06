import { ObyekWisata } from './../model/obyek-wisata.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObyekwisataService {

obyeks:ObyekWisata[]=[
  {
    obyekKODE:'33.08.02-W01',
    kategoriKODE:'KW01',
    kecamatanKODE:'33.08.02',
    obyekALAMAT:'Jl. Balaputradewa, Kecamatan Borobudur, Kabupaten Magelang, Jawa Tengah',
    obyekDEFINISI:"Jl. Balaputradewa, Kecamatan Borobudur, Kabupaten Magelang, Jawa Tengah",
    obyekDERAJAT_E:110,
    obyekDERAJAT_S:7,
    obyekDETIK_E:13,
    obyekDETIK_S:15,
    obyekFOTO:'https://upload.wikimedia.org/wikipedia/commons/a/a7/Borobudur_Stupa_Merapi.jpg',
    obyekJAMBUKA:new Date().getHours()+'',
    obyekJAMTUTUP:new Date().getHours()+'',
    obyekKEMUDAHAN:1,
    obyekKETERANGAN:'Dinasti Sailendra membangun peninggalan Budha terbesar di dunia antara 780-840 Masehi.',
    obyekKETINGGIAN:230,
    obyekLATITUDE:-7.60608339310,
    obyekLONGITUDE:110.21905517578,
    obyekMENIT_E:13,
    obyekMENIT_S:55,
    obyekNAMA:'Candi Borobudur',
    obyekPOPULARITAS:1,
    obyekWAKTUKUNJUNG:120

  },{
    obyekKODE:'33.08.02-W01',
    kategoriKODE:'KW01',
    kecamatanKODE:'33.08.02',
    obyekALAMAT:'Jl. Balaputradewa, Kecamatan Borobudur, Kabupaten Magelang, Jawa Tengah',
    obyekDEFINISI:"Jl. Balaputradewa, Kecamatan Borobudur, Kabupaten Magelang, Jawa Tengah",
    obyekDERAJAT_E:110,
    obyekDERAJAT_S:7,
    obyekDETIK_E:13,
    obyekDETIK_S:15,
    obyekFOTO:'https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/2001162996889/Candi%2520Prambanan%2520Tickets-2ef92ea4-bdac-422c-ae26-fae5752c7533.jpeg?_src=imagekit&tr=c-at_max,h-512,q-60,w-720',
    obyekJAMBUKA:new Date().getHours()+'',
    obyekJAMTUTUP:new Date().getHours()+'',
    obyekKEMUDAHAN:1,
    obyekKETERANGAN:'Dinasti Sailendra membangun peninggalan Budha terbesar di dunia antara 780-840 Masehi.',
    obyekKETINGGIAN:230,
    obyekLATITUDE:-7.60608339310,
    obyekLONGITUDE:110.21905517578,
    obyekMENIT_E:13,
    obyekMENIT_S:55,
    obyekNAMA:'Candi Prambanan',
    obyekPOPULARITAS:1,
    obyekWAKTUKUNJUNG:120

  },

]
constructor() { }

}
