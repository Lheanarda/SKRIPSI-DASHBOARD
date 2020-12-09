import { FasilitasObyek } from './../model/fasilitas-obyek.model';
import { Injectable } from '@angular/core';
import { Fasilitas } from '../model/fasilitas.model';

@Injectable({
  providedIn: 'root'
})
export class FasilitasService {

fasilitass:Fasilitas[]=[
  {
    fasilitasKODE:'FS01',
    fasilitasNAMA:'Tempat Parkir',
    fasilitasGUNA:'Sebagai sarana tempat untuk memarkirkan kendaraan para pengunjung'
  },
  {
    fasilitasKODE:'FS02',
    fasilitasNAMA:'Restaurant (Rumah Makan)',
    fasilitasGUNA:'Sebagai sarana yang disediakan obyek wisata untuk menyediakan sarana makan siang maupun malam '
  }
]

fasilitasObyeks:FasilitasObyek[]=[
  {
    fasilitasKODE:'FS01',
    obyekKODE:'W01',
    fasilitasNAMA:'Tempat Parkir',
    fasilitasobyekKET:'Tempat Parkir Wisata Candi Borobudur',
    obyekNAMA:'Candi Borobudur'
  }
]

constructor() { }

}
