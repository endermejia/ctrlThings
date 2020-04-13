import {Component, OnDestroy, ViewChild} from '@angular/core';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';

import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, BaseChartDirective, Label} from 'ng2-charts';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnDestroy {
  private subscription: Subscription;
  message: string;
  topicCPU = '/rasp/cpu';

  // Chart Config
  public lineChartData: ChartDataSets[] = [{data: [], label: 'Temp CPU'}];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          maxTicksLimit: 1
        }
      }],
      yAxes: [{}]
    },
    annotation: {},
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  // End Chart Config

  constructor(private _mqttService: MqttService) {
    // Subscribe CPU
    this.subscription = this._mqttService.observe(this.topicCPU).subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log('Received MQTT: ', this.message);
      // this.lineChartData.
      this.lineChartData.forEach((chartDataSet: ChartDataSets) => {
        const num = JSON.parse(this.message);
        chartDataSet.data.push(num);
      });
      this.lineChartLabels.push('');
    });
  }


  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
