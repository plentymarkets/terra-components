import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlentyAlert} from './alert/plenty-alert.component';
import { PlentyTextInput } from './forms/input/text-input/plenty-text-input.component';
import { PlentyNumberInput} from './forms/input/number-input/plenty-number-input.component';
import { PlentyCheckbox} from './forms/checkbox/plenty-checkbox/plenty-checkbox.component';


@NgModule({
  declarations: [
    AppComponent,
    PlentyAlert,
    PlentyTextInput,
    PlentyNumberInput,
    PlentyCheckbox
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
