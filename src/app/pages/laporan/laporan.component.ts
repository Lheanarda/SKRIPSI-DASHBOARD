import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.component.html',
  styleUrls: ['./laporan.component.scss']
})
export class LaporanComponent implements OnInit {


  //LAPORAN BERITA
  beritaChartOptions={
    scaleShowVerticalLines:true,
    responsive:true
  }
  beritaChartLabels=['Nov 2020','Des 2020','Jan 2021','Feb 2021'];
  beritaChartType='bar';
  beritaChartLegend=true;

  beritaChartData=[
    {data:[25,40,32,62], label:'Berita'},
    {data:[10,16,23,8], label:'Kegiatan'}
  ];

  //LAPORAN OBYEK WISATA
  //kabupaten
  kabupatenChartLabels = ['Kabupaten Sleman','Kabupaten Bantul', 'Kabupaten Magelang','Kabupaten Boyolali', 'Kabupaten Wonogiri', 'Other'];
  kabupatenChartData = [20,15,33,66,47,2];
  kabupatenChartType="doughnut";

  //wisata
  wisataChartOptions={
    scaleShowVerticalLines:true,
    responsive:true
  }
  wisataChartLabels=['Nov 2020','Des 2020','Jan 2021','Feb 2021'];
  wisataChartType='bar';
  wisataChartLegend=true;

  wisataChartData=[
    {data:[55,40,32,62], label:'Obyek Wisata'}
  ];


  //LAPORAN FREKUENSI RENCANA PERJALANAN
  //jumlah wisatawan
  wisatawanChartOptions={
    scaleShowVerticalLines:true,
    responsive:true
  }
  wisatawanChartLabels=['Nov 2020','Des 2020','Jan 2021','Feb 2021'];
  wisatawanChartType='line';
  wisatawanChartLegend=true;

  wisatawanChartData=[
    {data:[10,20,32,62], label:'Jumlah Pengguna'}
  ];

  //perkembangan mode yang sering dipakai
  modeChartOptions={
    scaleShowVerticalLines:true,
    responsive:true
  }
  modeChartLabels=['Nov 2020','Des 2020','Jan 2021','Feb 2021'];
  modeChartType='bar';
  modeChartLegend=true;

  modeChartData=[
    {data:[25,40,32,62], label:'Reccomendation'},
    {data:[10,16,23,8], label:'Start to End'}
  ];

  //kabupaten yang sering digunakan
  kabupatenwChartLabels = ['Kabupaten Sleman','Kabupaten Bantul', 'Kabupaten Magelang','Kabupaten Boyolali', 'Kabupaten Wonogiri', 'Other'];
  kabupatenwChartData = [20,15,33,66,47,2];
  kabupatenwChartType="doughnut";

  //tempat awal
  awalChartLabels = ['Waduk Gajah Mungkur','Candi Prambanan', 'Candi Borobudur','Candi Mendut', 'Museum Karst', 'Other'];
  awalChartData = [20,15,33,66,47,2];
  awalChartType="pie";

  //tujuan
  tujuanChartLabels = ['Goa Putri Kencono','Air Terjun Grojogan Sewu', 'Bukit Sekipan','Candi Cetho', 'Kampung Batik Griloyo', 'Other'];
  tujuanChartData = [20,15,38,40,30,2];
  tujuanChartType="pie";


  //expansion control
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  constructor() { }

  ngOnInit() {
  }

}
