import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnDestroy {
  // private mqttClient: Paho.MQTT.Client;
  private subscription: Subscription;
  private message: string;
  topicname = '/rasp/led';
  msg: string;
  isConnected: boolean = false;
  @ViewChild('msglog', {static: true}) msglog: ElementRef;

  constructor(private _mqttService: MqttService) {
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
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
    this._mqttService.unsafePublish(this.topicname, this.msg, {qos: 1, retain: true})
    this.msg = ''
  }
}
