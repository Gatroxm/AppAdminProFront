import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AsccountSettingsComponent } from './asccount-settings/asccount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component:PagesComponent,
        canActivate:[AuthGuard],
        children: [
          { path: '', component:DashboardComponent, data: {titulo: 'Dashboard'}},
          { path: 'progress', component:ProgressComponent, data: {titulo: 'Progress'}},
          { path: 'graficas1', component:Grafica1Component, data: {titulo: 'Graficas'}},
          { path: 'account-settings', component:AsccountSettingsComponent, data: {titulo: 'Account Settings'}},
          { path: 'promesas', component:PromesasComponent, data: {titulo: 'Pormesa'}},
          { path: 'rxjs', component:RxjsComponent, data: {titulo: 'RxJs'}},
          { path: 'perfil', component:PerfilComponent, data: {titulo: 'Mi Perfil'}},
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
