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

constructor() { }

}
