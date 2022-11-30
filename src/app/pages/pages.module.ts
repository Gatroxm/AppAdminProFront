import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';



import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AsccountSettingsComponent } from './asccount-settings/asccount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

@NgModule({
  declarations: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AsccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
  ],
  exports: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AsccountSettingsComponent,
    PromesasComponent,
    RxjsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
})
export class PagesModule {}
