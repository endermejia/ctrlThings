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
  statusLED: boolean = false;
  msg: string;

  constructor(public authService: AuthService, private _mqttService: MqttService) {
  }

  public unsafePublish(): void {
    // use unsafe publish for non-ssl websockets
    console.log('Sent MQTT: ', this.msg);
    this._mqttService.unsafePublish(this.topicName, this.msg, {qos: 1, retain: true});
    this.msg = '';
  }

  public controlLED() {
    // use unsafe publish for non-ssl websockets
    console.log('Turn ' + (this.statusLED ? 'on' : 'off') + ' the LED');
    this._mqttService.unsafePublish(this.topicName, this.statusLED.toString(), {qos: 1, retain: true});
  }
}
