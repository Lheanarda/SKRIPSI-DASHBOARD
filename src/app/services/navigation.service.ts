import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

navigationState = {
  domain : false,
  wisata: false,
  berita:false
}

constructor() { }

}
