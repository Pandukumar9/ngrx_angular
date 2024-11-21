import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ObserSignalNgrx1Component } from './pages/obser-signal-ngrx-1/obser-signal-ngrx-1.component';
import { ObserSignalNgrx2Component } from './pages/obser-signal-ngrx-2/obser-signal-ngrx-2.component';
import { ObserSignalNgrx3Component } from './pages/obser-signal-ngrx-3/obser-signal-ngrx-3.component';
import { ObserSignalNgrxListComponent } from './pages/obser-signal-ngrx-list/obser-signal-ngrx-list.component';
import { DeleteComponent } from './pages/delete/delete.component';
import { ReuseDialogComponent } from './pages/reuse-dialog/reuse-dialog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EffectsModule } from '@ngrx/effects';
import { NgrxApiEffects } from './reuse-ngrx/reuse-ngrx.effects';
import { ngrxApiReducer } from './reuse-ngrx/reuse-ngrx.reducer';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ObserSignalNgrx1Component,
    ObserSignalNgrx2Component,
    ObserSignalNgrx3Component,
    ObserSignalNgrxListComponent,
    DeleteComponent,
    ReuseDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ user: ngrxApiReducer }), // Register the reducer
    EffectsModule.forRoot([NgrxApiEffects]), // Register effects
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
