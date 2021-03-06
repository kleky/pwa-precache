import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatCardModule, MatListModule} from '@angular/material';
import {ConnectionServiceModule} from 'ng-connection-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatListModule,
    ConnectionServiceModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
