import {Component} from '@angular/core';
import {MqttService} from 'ngx-mqtt';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {
  message: string;
  topicName = '/rasp/led';
  msg: string;

  constructor(public authService: AuthService, private _mqttService: MqttService) {
  }

  public unsafePublish(): void {
    // use unsafe publish for non-ssl websockets
    console.log('Sent MQTT: ', this.msg);
    this._mqttService.unsafePublish(this.topicName, this.msg, {qos: 1, retain: true});
    this.msg = '';
  }

  public turnOnLED() {
    // use unsafe publish for non-ssl websockets
    console.log('Turn on the LED');
    this._mqttService.unsafePublish(this.topicName, 'true', {qos: 1, retain: true});
  }

  public turnOffLED() {
    // use unsafe publish for non-ssl websockets
    console.log('Turn off the LED');
    this._mqttService.unsafePublish(this.topicName, 'false', {qos: 1, retain: true});
  }
}
