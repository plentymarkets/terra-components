import { Component } from '@angular/core';

@Component({
    selector: 'terra-group-function-example',
    template: require('./terra-group-function.component.example.html')
})

export class TerraGroupFunctionComponentExample
{
    protected showGroupFunction:boolean = false;

    protected doSomething(text:string):void
    {
        console.log(`Group function executed with text "${text ? text : ''}"`);
    }
}
