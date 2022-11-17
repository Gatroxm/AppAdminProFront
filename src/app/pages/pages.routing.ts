import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AsccountSettingsComponent } from './asccount-settings/asccount-settings.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component:PagesComponent,
        children: [
          { path: '', component:DashboardComponent},
          { path: 'progress', component:ProgressComponent},
          { path: 'graficas1', component:Grafica1Component},
          { path: 'account-settings', component:AsccountSettingsComponent},
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
