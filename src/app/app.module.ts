import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlentyAlert} from './alert/plenty-alert.component';
import { PlentyTextInput } from './forms/input/text-input/plenty-text-input.component';


@NgModule({
  declarations: [
    AppComponent,
    PlentyAlert,
    PlentyTextInput
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
