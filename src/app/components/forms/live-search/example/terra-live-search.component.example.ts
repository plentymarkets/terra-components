import {
    Component,
    OnInit
} from '@angular/core';
import { TerraLiveSearchServiceExample } from './terra-live-search.service.example';
import { Observable } from 'rxjs';
import { TerraSuggestionBoxValueInterface } from '../../../../..';

@Component({
    selector: 'terra-live-search-component-example',
    template: require('./terra-live-search.component.example.html')
})
export class TerraLiveSearchComponentExample implements OnInit
{
    protected call:(text:string) => Observable<any>;
    protected mappingFunc:(value:any) => TerraSuggestionBoxValueInterface;
    protected selectedValue:any;
    constructor(private service:TerraLiveSearchServiceExample)
    {
    }

    public ngOnInit():void
    {
        this.call = (text:string):Observable<any> => this.getContacts(text);
        this.mappingFunc = (value:any):TerraSuggestionBoxValueInterface => this.mapValue(value);
    }

    private getContacts(text:string):Observable<any>
    {
        return this.service.getContacts(text);
    }

    private mapValue(value:any):TerraSuggestionBoxValueInterface
    {
        return {
            caption: value.name,
            value:   value
        };
    }

    protected onChange(value:any):void
    {
        console.log(value);
    }
}
