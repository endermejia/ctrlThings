import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './services/auth.guard';

import {StatusComponent} from './components/status/status.component';
import {ControlComponent} from './components/control/control.component';
import {SettingsComponent} from './components/settings/settings.component';
import {AboutComponent} from './components/about/about.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'status', component: StatusComponent
  },
  {
    path: 'control', component: ControlComponent, canActivate: [AuthGuard]
  },
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: '', component: StatusComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
