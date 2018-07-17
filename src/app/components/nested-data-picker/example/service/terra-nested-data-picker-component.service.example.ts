import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from 'util';
import { NestedDataInterface } from '../../../nested-data-picker/data/nested-data.interface';
import { TerraNestedDataPickerBaseService } from '../../../nested-data-picker/service/terra-nested-data-picker-base.service';
import { Observer } from 'rxjs';
@Injectable()
export class NestedPickerExampleService extends TerraNestedDataPickerBaseService<{}>
{
    public results:Object = {
            Parent:{
                child1:{
                    fieldName:'age',
                    fieldType:'int',
                    fieldValuesMapKey:'',
                    groupFieldLabel:'Parent',
                    label:'Age rating'
                },
                child2:{
                    fieldName:'name',
                    fieldType:'string',
                    fieldValuesMapKey:'',
                    groupFieldLabel:'Parent',
                    label:'Name'
                }
            },
            Parent2:{
                child3:{
                    fieldName:'ean',
                    fieldType:'float',
                    fieldValuesMapKey:'',
                    groupFieldLabel:'Parent2',
                    label:'EAN'
                },
                child4:{
                    fieldName:'tall',
                    fieldType:'boolean',
                    fieldValuesMapKey:'',
                    groupFieldLabel:'Parent2',
                    label:'Tall'
                }
            }
    };
    public requestNestedData():Observable<Array<NestedDataInterface<{}>>>
    {
        let nestedData:Array<NestedDataInterface<{}>> = [];
        Object.getOwnPropertyNames(this.results).map((key:string) =>
        {
            let nestedDataEntry:NestedDataInterface < {} > = {
                key: key,
                label: key,
                isSelected: false
            };
            if (!isNullOrUndefined(this.results[key]))
            {
                nestedDataEntry.children = [];
                Object.getOwnPropertyNames(this.results[key]).map((child:string) =>
                {
                    nestedDataEntry.children.push({
                        key: this.results[key][child]['fieldName'],
                        label: this.results[key][child]['label'],
                        isSelected: false
                    });
                });
            }
            nestedData.push(nestedDataEntry);
        });
        return Observable.create((observer:Observer<Array<NestedDataInterface<{}>>>) =>
        {
            observer.next(nestedData);
            observer.complete();
        });
    }
}
