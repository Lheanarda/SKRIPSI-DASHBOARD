import { Injectable } from '@angular/core';
import { Kabupaten } from '../model/kabupaten.model';

@Injectable({
  providedIn: 'root'
})
export class KabupatenService {

kabupaten:Kabupaten[]=[
  {
    kabupatenKODE:'34.04',
    kabupatenALAMAT:'Jl Parasamya Beran Tridadi Sleman, Daerah Istimewa Yogyakarta 55511',
    kabupatenFOTOICON:"https://jogjacar.com/wp-content/uploads/2018/07/Kabupaten-Sleman-google.com_.jpg",
    kabupatenFOTOICONKET:"Candi Prambanan",
    kabupatenKET:"Alamat Sekretariat Daerah Kabupaten",
    kabupatenNAMA:"Kabupaten Sleman"
  },
  {
    kabupatenKODE:'33.08',
    kabupatenALAMAT:'Kantor Pemerintahan : Jl. Soekarno Hatta (Jl. Letnan Tukiyat) ',
    kabupatenFOTOICON:"https://travelmaker.id/wp-content/uploads/2020/05/WhatsApp-Image-2020-05-11-at-19.16.49.jpeg",
    kabupatenFOTOICONKET:"Candi Borobudur",
    kabupatenKET:"Sejarah kabupaten Magelang tidak bisa dipisahkan dari",
    kabupatenNAMA:"Kabupaten Magelang"
  }
]

constructor() { }

}
