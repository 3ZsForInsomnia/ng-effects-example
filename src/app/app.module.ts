import { ButtonComponent } from './example3/button.component';
import { Example3Component } from './example3/example3.component';
import { Example2Component } from './example2/example2.component';
import { Example1Component } from './example1/example1.component';
import { ActualService } from './example1/example1.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { counterReducer } from './ngrx.stuff';

@NgModule({
  declarations: [
    AppComponent,
    Example1Component,
    Example2Component,
    Example3Component,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ count: counterReducer }),
  ],
  providers: [ActualService],
  bootstrap: [AppComponent],
})
export class AppModule {}
