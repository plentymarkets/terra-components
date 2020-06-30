import { Component } from '@angular/core';

@Component({
    selector:    'terra-group-function-example',
    templateUrl: './terra-group-function.component.example.html'
})

export class TerraGroupFunctionComponentExample
{
    public _showGroupFunction:boolean = false;

    public _doSomething(text:string):void
    {
        console.log(`Group function executed with text "${text ? text : ''}"`);
    }
}
