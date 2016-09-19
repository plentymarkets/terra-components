import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PlentySplitViewData } from './split-view/data/plenty-split-view-data';
import { PlentyButton } from './button/plenty-button.component';
import { PlentyPortlet } from './portlet/plenty-portlet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'app works!';
  private _components: Array<PlentySplitViewData> = [];

  ngAfterViewInit()
  {
    this.components.push({
                           component:    PlentyPortlet,
                           defaultWidth: '200px'
                         });
    this.components.push({
                           component:    PlentyPortlet,
                           defaultWidth: '1100px'
                         });
  }

  public get components(): Array<PlentySplitViewData>
  {
    return this._components;
  }

  public set components(value: Array<PlentySplitViewData>)
  {
    this._components = value;
  }

  private addComponent(): void
  {
    this.components.push({
                           component:    PlentyButton,
                           defaultWidth: '150px'
                         });
  }
}
