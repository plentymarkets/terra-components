import { Component, OnInit } from '@angular/core';
import { PlentyInputComponent } from '../plenty-input.component';
import { PlentyRegex } from '../../../regex/plenty-regex';

@Component({
  selector: 'plenty-plenty-text-input',
  templateUrl: './plenty-text-input.component.html',
  styleUrls: ['./plenty-text-input.component.css']
})
export class PlentyTextInput extends PlentyInputComponent
{
  constructor()
  {
    super('text', PlentyRegex.MIXED);
  }

  ngOnInit() {
  }

}
