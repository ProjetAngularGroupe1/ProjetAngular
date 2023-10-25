import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReunionComponent } from './components/reunion/reunion.component';

import { FirstPipe } from'./pipes/first.pipe';
import { FirstService } from "./services/first.service"
import { FirstDirective } from'./directives/first.directive';


@NgModule({
  declarations: [
    AppComponent,
    ReunionComponent,
    FirstDirective,
    FirstPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    FirstService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
