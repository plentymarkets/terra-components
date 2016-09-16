import { Component, OnInit, Input } from '@angular/core';
import { PlentyTaglist } from '../taglist/plenty-taglist.component';
import { PlentyButton } from '../button/plenty-button/plenty-button.component';

@Component({
  selector: 'plenty-plenty-infobox',
  templateUrl: './plenty-infobox.component.html',
  styleUrls: ['./plenty-infobox.component.css']
})
export class PlentyInfobox implements OnInit
{
  @Input() tagList:Array<PlentyTaglist>;
  @Input() buttonList:Array<PlentyButton>;

  constructor() { }

  ngOnInit() {
  }

}
