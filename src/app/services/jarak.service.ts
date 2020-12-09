import { Injectable } from '@angular/core';
import { Jarak } from '../model/jarak.model';

@Injectable({
  providedIn: 'root'
})
export class JarakService {

jaraks:Jarak[]=[
  {
    obyekKODEasal:'Candi Prambanan',
    obyekKODEtujuan:'Candi Borobudur',
    obyekRUTE:'Melalui jalan desa yang tidak lebar dan jalanan menanjak dan turunan, perlu kehati-hatian pengendara',
    obyekjarak:15,
    obyektempuh:120
  },
  {
    obyekKODEasal:'Candi Cetho',
    obyekKODEtujuan:'Museum Karst',
    obyekRUTE:'-',
    obyekjarak:15,
    obyektempuh:120
  }
]

constructor() { }

}
