import { LaporanService } from './../../services/laporan.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.component.html',
  styleUrls: ['./laporan.component.scss']
})
export class LaporanComponent implements OnInit {


  loading:boolean;
  //LAPORAN BERITA
  beritaChartOptions={
    scaleShowVerticalLines:true,
    responsive:true,
    scales:{
      yAxes: [{
        display: true,
        ticks: {
            beginAtZero: true,
            steps: 1,
            stepValue: 1
        }
      }]
    }
  }
  beritaChartLabels=[];
  beritaChartType='bar';
  beritaChartLegend=true;

  beritaChartData=[];

  //LAPORAN OBYEK WISATA
  //kabupaten
  kabupatenChartLabels = [];
  kabupatenChartData = [];
  kabupatenChartType="doughnut";

  //wisata
  wisataChartOptions={
    scaleShowVerticalLines:true,
    responsive:true,
    scales:{
      yAxes: [{
        display: true,
        ticks: {
            beginAtZero: true,
            steps: 1,
            stepValue: 1
        }
      }]
    }
  }
  wisataChartLabels=[];
  wisataChartType='bar';
  wisataChartLegend=true;

  wisataChartData=[];


  //LAPORAN FREKUENSI RENCANA PERJALANAN
  rencanaChartOptions={
    scaleShowVerticalLines:true,
    responsive:true,
    scales:{
      yAxes: [{
        display: true,
        ticks: {
            beginAtZero: true,
            steps: 1,
            stepValue: 1
        }
      }]
    }
  }
  rencanaChartLabels=[];
  rencanaChartType='bar';
  rencanaChartLegend=true;

  rencanaChartData=[];


  //expansion control
  step = 0;

  laporanJumlah:any;
  constructor(private laporanService:LaporanService) { }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {
    this.loading = true;
    this.laporanService.onFetchLaporan().subscribe((res:any)=>{
      console.log(res);
      this.loading = false;
      if(res.success && res.data){
        const data = res.data;

        //LAPORAN JUMLAH
        this.laporanJumlah = res.data.laporan_jumlah;

        //LAPORAN BERITA KEGIATAN
        const dataBerita = [];
        const dataKegiatan = [];
        data.laporan_berita_kegiatan.forEach(laporan=>{
          this.beritaChartLabels.push(laporan.date);
          dataBerita.push(laporan.total_berita);
          dataKegiatan.push(laporan.total_kegiatan);
        });
        console.log(dataBerita,dataKegiatan)
        this.beritaChartData = [
          {data:dataBerita,label:'Berita Terdaftar'},
          {data:dataKegiatan,label:'Kegiatan Terdaftar'}
        ];

        //LAPORAN OBYEK WISATA
        //LAPORAN WISATA PER KABUPATEN
        data.laporan_wisata.jumlah_wisata_per_kabupaten.forEach(laporan=>{
          this.kabupatenChartLabels.push(laporan.kabupatenNAMA);
          this.kabupatenChartData.push(laporan.jumlah_wisata)
        });

        //LAPORAN WISATA PER BULAN
        const dataWisata = [];
        data.laporan_wisata.jumlah_wisata_per_bulan.forEach(laporan=>{
          this.wisataChartLabels.push(laporan.date);
          dataWisata.push(laporan.total_wisata);
        });
        this.wisataChartData = [
          {data:dataWisata,label:'Obyek Wisata Baru'}
        ];

        //LAPORAN AKTIVITAS

        const dataPengguna = [];
        const dataRencana = [];
        data.laporan_pengguna.forEach(laporan=>{
          this.rencanaChartLabels.push(laporan.date);
          dataPengguna.push(laporan.total_anggota);
          dataRencana.push(laporan.total_perjalanan);
        });
        this.rencanaChartData = [
          {data:dataPengguna,label:'Pengguna Baru'},
          {data:dataRencana,label:'Rencana Perjalanan Dibuat'}
        ]
      }
    })
  }

}
