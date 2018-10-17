import { Component } from '@angular/core';

@Component({
    selector: 'terra-3-col-example',
    template: require('./terra-three-column-container.component.example.html')
})

export class TerraThreeColumnContainerComponentExample
{
    protected leftColumnWidth:number = 4;
    protected centerColumnWidth:number = 4;
    protected rightColumnWidth:number = 4;
}
