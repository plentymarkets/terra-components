import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { PlentyAlert} from './alert/plenty-alert.component';
import { PlentyTextInput } from './forms/input/text-input/plenty-text-input.component';
import { PlentyNumberInput} from './forms/input/number-input/plenty-number-input.component';
import { PlentyCheckbox} from './forms/checkbox/plenty-checkbox/plenty-checkbox.component';
import { PlentyButton} from './button/plenty-button/plenty-button.component';


@NgModule({
  declarations: [
    AppComponent,
    PlentyTextInput,
    PlentyNumberInput,
    PlentyCheckbox,
    PlentyButton
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TooltipModule
  ],
  providers: [PlentyAlert],
  bootstrap: [AppComponent]
})
export class AppModule { }
