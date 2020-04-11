import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {StatusComponent} from './components/status/status.component';
import {ControlComponent} from './components/control/control.component';
import {SettingsComponent} from './components/settings/settings.component';
import {NavbarComponent} from './components/shared/navbar/navbar.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {AboutComponent} from './components/about/about.component';
import {MqttModule, IMqttServiceOptions} from 'ngx-mqtt';
import {FormsModule} from '@angular/forms';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '192.168.0.109',
  port: 9001,
  path: '/mqtt'
};

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    ControlComponent,
    SettingsComponent,
    NavbarComponent,
    PageNotFoundComponent,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    FormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
