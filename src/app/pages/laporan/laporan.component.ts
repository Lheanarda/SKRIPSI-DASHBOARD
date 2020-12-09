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
  rencanaChartOptions={
    scaleShowVerticalLines:true,
    responsive:true
  }
  rencanaChartLabels=['Nov 2020','Des 2020','Jan 2021','Feb 2021'];
  rencanaChartType='bar';
  rencanaChartLegend=true;

  rencanaChartData=[
    {data:[25,40,32,62], label:'Pengguna'},
    {data:[10,16,23,8], label:'Jumlah Rencana'}
  ];


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
