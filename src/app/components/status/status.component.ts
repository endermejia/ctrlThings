import {Component, OnDestroy} from '@angular/core';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnDestroy {
  private subscription: Subscription;
  message: string;
  topicCPU = '/rasp/cpu';

  constructor(private _mqttService: MqttService) {
    // Subscribe CPU
    this.subscription = this._mqttService.observe(this.topicCPU).subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log('Received MQTT: ', this.message);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
