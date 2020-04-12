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
  topicName = '/rasp/led';
  msg: string;

  constructor(private _mqttService: MqttService) {
    this.subscription = this._mqttService.observe(this.topicName).subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log('Received MQTT: ', this.message);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public unsafePublish(): void {
    // use unsafe publish for non-ssl websockets
    console.log('Sent MQTT: ', this.msg);
    this._mqttService.unsafePublish(this.topicName, this.msg, {qos: 1, retain: true})
    this.msg = ''
  }
}
