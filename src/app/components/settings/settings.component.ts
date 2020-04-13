import {Component, OnInit} from '@angular/core';
import {MqttService} from 'ngx-mqtt';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private _mqttService: MqttService) {
    this._mqttService.unsafePublish('/rasp/reboot', 'false', {qos: 1, retain: true});
    this._mqttService.unsafePublish('/rasp/shutdown', 'false', {qos: 1, retain: true});
  }

  ngOnInit(): void {
  }

  rebootRasp(): void {
    console.log('Reboot Raspberry');
    this._mqttService.unsafePublish('/rasp/reboot', 'true', {qos: 1, retain: false});
  }

  shutdownRasp(): void {
    console.log('Shutdown Raspberry');
    this._mqttService.unsafePublish('/rasp/shutdown', 'true', {qos: 1, retain: false});

  }

}
