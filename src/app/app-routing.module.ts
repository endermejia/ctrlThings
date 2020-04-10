import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ControlComponent} from './components/control/control.component';
import {SettingsComponent} from './components/settings/settings.component';
import {StatusComponent} from './components/status/status.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'status', component: StatusComponent
  },
  {
    path: 'control', component: ControlComponent
  },
  {
    path: 'settings', component: SettingsComponent
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
