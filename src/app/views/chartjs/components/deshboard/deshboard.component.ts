import { Component, OnInit } from "@angular/core";
import { Label, Color } from "ng2-charts";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { SystemHealth } from "../../models/system-health";
import { SystemCpu } from "../../models/system-cpu";
import { MonitorService } from "../../service/monitor-service.service";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { DetailsModalComponent } from "../details-modal/details-modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { StateService } from "../../../../core/state.service";

@Component({
  selector: "app-deshboard",
  templateUrl: "./deshboard.component.html",
  styleUrls: ["./deshboard.component.css"],
})
export class DeshboardComponent implements OnInit {
  displayedColumns: string[] = [
    "timeStamp",
    "method",
    "timeTaken",
    "status",
    "uri",
    "view",
  ];

  ngOnInit(): void {
    this.getTraces();
    this.getCpuUsage();
    this.getSystemHealth();
    this.getProcessUpTime(true);
    // generate random values for mainChart
    // for (let i = 0; i <= this.mainChartElements; i++) {
    //   this.mainChartData1.push(this.random(50, 200));
    //   this.mainChartData2.push(this.random(80, 100));
    //   this.mainChartData3.push(65);
    // }
  }

  traceList: any[] = [];
  selectedTrace: any;
  public systemHealth: SystemHealth;
  public systemCpu: SystemCpu;
  public processUpTime: string;
  public http200Traces: any[] = [];
  public http400Traces: any[] = [];
  public http404Traces: any[] = [];
  public http500Traces: any[] = [];
  public httpDefaultTraces: any[] = [];
  private timestamp: number;
  public pageSize = 10;
  public page = 1;

  constructor(
    private monitorService: MonitorService,
    protected dialog: MatDialog,
    public stateService: StateService
  ) {}

  public dataSource = new MatTableDataSource();

  private getProcessUpTime(isUpdateTime: boolean) {
    this.monitorService.getProcessUptime().subscribe(
      (response: any) => {
        this.timestamp = Math.round(response.measurements[0].value);
        this.processUpTime = this.formateUptime(this.timestamp);
        this.stateService.setProcessUpTime(this.processUpTime);
        if (isUpdateTime) {
          this.updateTime();
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    title:{
      display: true,
      test: [`Last 100 request as of ${new Date()}`]
    },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
          },
        },
      ],
      xAxes: [
        {
          categoryPercentage: 1.0,
          barPercentage: 0.6,
        },
      ],
    },
  };
  public barChartLabels: string[] = ["200", "400", "404", "500"];
  public barChartType = "bar";
  public barChartLegend = true;

  public barChartData: any[] = [];
  public getTraces() {
    this.monitorService.getHttpTrace().subscribe(
      (response: any) => {
        console.log(response);
        this.processTraces(response.traces);
        this.dataSource.data = this.traceList;
        this.barChartData = [
          {
            data: [
              this.http200Traces.length,
              this.http404Traces.length,
              this.http400Traces.length,
              this.http500Traces.length,
            ],
            backgroundColor: [
              "rgba(0, 128, 0, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(255,0,0,0.2)",
            ],
            borderColor: [
              "rgba(0, 128, 0, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(255,0,0,1)",
            ],
            borderWidth: 1,
          },
        ];
        this.pieChartData = [
          {
            data: [
              this.http200Traces.length,
              this.http404Traces.length,
              this.http400Traces.length,
              this.http500Traces.length,
            ],
            backgroundColor: [
              "rgba(0, 128, 0, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(255,0,0,0.2)",
            ],
            borderColor: [
              "rgba(0, 128, 0, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(255,0,0,1)",
            ],
            borderWidth: 1,
          },
        ];
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  private processTraces(traces: any) {
    this.traceList = traces.filter((trace) => {
      return !trace.request.uri.includes("actuator");
    });
    this.traceList.forEach((trace) => {
      switch (trace.response.status) {
        case 200:
          this.http200Traces.push(trace);
          break;
        case 400:
          this.http400Traces.push(trace);
          break;
        case 404:
          this.http404Traces.push(trace);
          break;
        case 500:
          this.http500Traces.push(trace);
          break;
        default:
          this.httpDefaultTraces.push(trace);
      }
    });
  }
  private getSystemHealth() {
    this.monitorService.getSystemHealth().subscribe(
      (response: SystemHealth) => {
        this.systemHealth = response;
        this.stateService.setSystemHealth(this.systemHealth);
        this.systemHealth.components.diskSpace.details.free = this.formatBytes(
          this.systemHealth.components.diskSpace.details.free
        );
      },
      (error: HttpErrorResponse) => {
        this.systemHealth = error.error;
      }
    );
  }
  private updateTime(): void {
    setInterval(() => {
      this.processUpTime = this.formateUptime(this.timestamp + 1);
      this.stateService.setProcessUpTime(this.processUpTime);
      this.timestamp++;
    }, 1000);
  }

  private formateUptime(timestamp: number): string {
    const hours = Math.floor(timestamp / 60 / 60);
    const minutes = Math.floor(timestamp / 60) - hours * 60;
    const seconds = timestamp % 60;
    return (
      hours.toString().padStart(2, "0") +
      "h" +
      minutes.toString().padStart(2, "0") +
      "m" +
      seconds.toString().padStart(2, "0") +
      "s"
    );
  }
  private formatBytes(bytes: any): string {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = 2 < 0 ? 0 : 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  private getCpuUsage() {
    this.monitorService.getSystemCpu().subscribe(
      (response: SystemCpu) => {
        console.log("response");
        console.log(response);

        this.systemCpu = response;
        this.stateService.setCpuMesurement(this.systemCpu);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  details(trace: any) {
    try {
      this.dialog
        .open(DetailsModalComponent, {
          width: "60%",
          data: trace,
        })
        .afterClosed()
        .subscribe((result) => {
          if (result !== undefined) {
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  // Pie
  public pieChartLabels: string[] = ["200", "400", "404", "500"];
  public pieChartData: any[] = [];
  public pieChartType = "pie";

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  // end of pie chart

  // Deshboard Menu
  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: "Series A",
    },
  ];
  public lineChart1Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "transparent",
            zeroLineColor: "transparent",
          },
          ticks: {
            fontSize: 2,
            fontColor: "transparent",
          },
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: 40 - 5,
            max: 84 + 5,
          },
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false,
    },
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle("--warning"),
      borderColor: "rgba(255,255,255,.55)",
    },
  ];
  public lineChart1Legend = false;
  public lineChart1Type = "line";

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: "Series A",
    },
  ];
  public lineChart2Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: "transparent",
            zeroLineColor: "transparent",
          },
          ticks: {
            fontSize: 2,
            fontColor: "transparent",
          },
        },
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: 1 - 5,
            max: 34 + 5,
          },
        },
      ],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false,
    },
  };
  public lineChart2Colours: Array<any> = [
    {
      // grey
      backgroundColor: getStyle("--success"),
      borderColor: "rgba(255,255,255,.55)",
    },
  ];
  public lineChart2Legend = false;
  public lineChart2Type = "line";

  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: "Series A",
    },
  ];
  public lineChart3Labels: Array<any> = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false,
    },
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.2)",
      borderColor: "rgba(255,255,255,.55)",
    },
  ];
  public lineChart3Legend = false;
  public lineChart3Type = "line";

  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: "Series A",
      barPercentage: 0.6,
    },
  ];
  public barChart1Labels: Array<any> = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
    legend: {
      display: false,
    },
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: "rgba(255,255,255,.3)",
      borderWidth: 0,
    },
  ];
  public barChart1Legend = false;
  public barChart1Type = "bar";

  // mainChart

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: "Current",
    },
    {
      data: this.mainChartData2,
      label: "Previous",
    },
    {
      data: this.mainChartData3,
      label: "BEP",
    },
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Thursday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: "index",
      position: "nearest",
      callbacks: {
        labelColor: function (tooltipItem, chart) {
          return {
            backgroundColor:
              chart.data.datasets[tooltipItem.datasetIndex].borderColor,
          };
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: function (value: any) {
              return value.charAt(0);
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5),
            max: 250,
          },
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    legend: {
      display: false,
    },
  };

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
