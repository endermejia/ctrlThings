import {Component, OnDestroy} from '@angular/core';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnDestroy{
  private subscriptionLED: Subscription;
  message: string;
  topicLED = '/rasp/led';
  statusLED: boolean = false;
  msg: string;

  constructor(public authService: AuthService, private _mqttService: MqttService) {
    // Subscribe CPU
    this.subscriptionLED = this._mqttService.observe(this.topicLED).subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log('Received MQTT: ', this.message);
      this.statusLED = JSON.parse(this.message);
      console.log('statusLED: ', this.statusLED);
    });
  }

  public unsafePublish(): void {
    // use unsafe publish for non-ssl websockets
    console.log('Sent MQTT: ', this.msg);
    this._mqttService.unsafePublish(this.topicLED, this.msg, {qos: 1, retain: true});
    this.msg = '';
  }

  public controlLED() {
    // use unsafe publish for non-ssl websockets
    console.log('Turn ' + (this.statusLED ? 'on' : 'off') + ' the LED');
    this._mqttService.unsafePublish(this.topicLED, this.statusLED.toString(), {qos: 1, retain: true});
  }

  ngOnDestroy(): void {
    this.subscriptionLED.unsubscribe();
  }
}
