import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RequestSenderService } from '../../Services/request-sender.service';
import { Subject } from 'rxjs';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexFill,
  ApexLegend
} from "ng-apexcharts";
interface TimeSlot {
  id: number;
  timeRange: string;
}

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  title :ApexTitleSubtitle
};

interface Count {
  courses: number,
  subjects: number,
  students: number,
  Lectures: number
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {
  @ViewChild("chart")
  chart!: ChartComponent;
  @ViewChild("piechart") piechart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public pieChartOptions!: Partial<PieChartOptions>
  count: Count = {
    courses: 0,
    subjects: 0,
    students: 0,
    Lectures: 0
  }
  constructor(private _router: Router, private httpSender: RequestSenderService) {
    this.chartOptions = {
      series: [
        {
          name: "Active Visits",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
    this.pieChartOptions = {
      title :{
        text : "Statistics"
      },
      series: [0, 0, 0, 0],
      labels: ["Courses", "Lecture", "Student", "Subject"],
      chart: {
        width: 380,
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }


  public generateData(baseval: number, count: number, yrange: { max: number; min: number; }) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  subjectList: any[] = [];
  timeTable: any[] = [];

  stuff: any;
  ngOnInit(): void {
    this.stuff = this.getUserData()
    console.log(this.stuff)
    if (this.stuff == null) {
      sessionStorage.clear();
    }
    this.GetSubject(this.stuff.staffNo)
    this.getSubjectList();
    this.GetCount()
    
  }


  getUserData(): any {
    const userDataString = sessionStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }
  logout() {

    sessionStorage.clear();
    this._router.navigateByUrl('login')
  }


  timeSlots: TimeSlot[] = [
    { id: 0, timeRange: '08:00 - 09:00' },
    { id: 1, timeRange: '09:00 - 10:00' },
    { id: 2, timeRange: '10:00 - 11:00' },
    { id: 3, timeRange: '11:00 - 12:00' },
    { id: 4, timeRange: '12:00 - 13:00' },
    { id: 5, timeRange: '13:00 - 14:00' },
    { id: 6, timeRange: '14:00 - 15:00' },
    { id: 7, timeRange: '15:00 - 16:00' }
  ];

  GetSubject(id: number): void {
    this.httpSender.sendGet<any>('admin/all-user-subjects/' + id)
      .subscribe(
        (response) => {
          // Handle successful response
          console.log('data:', response.body);

          this.subjectList = response.body;

        },
        (error) => {
          // Handle error
          console.error('Error:', error);
        }
      );
  }

  GetCount(): void {
    this.httpSender.sendGet<any>('api/count')
      .subscribe(
        (response) => {
          //console.log(response.body)
          this.count = response.body
          this.pieChartOptions.series = [this.count.courses,this.count.Lectures,this.count.students,this.count.subjects]
        },
        (error) => {
          console.error(error)
        }
      )
  }
  getSubjectList() {
    this.httpSender.sendGet<any>("lecture/timeTable/" + this.stuff.staffNo).subscribe(
      (res) => {
        this.timeTable = res.body
        console.log("Regsiter", this.subjectList)
      }
    )
  }

}
