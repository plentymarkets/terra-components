import {
    Component,
    OnInit,
    ViewChild,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation
} from '@angular/core';
import { TerraPagerInterface } from './data/terra-pager.interface';
import { TerraNumberInputComponent } from '../forms/input/number-input/terra-number-input.component';
import { TerraSelectBoxValueInterface } from '../forms/select-box/data/terra-select-box.interface';

@Component({
               selector:      'terra-pager',
               styles:        [require('./terra-pager.component.scss')],
               template:      require('./terra-pager.component.html'),
           })
export class TerraPagerComponent implements OnInit
{
    @ViewChild(TerraNumberInputComponent) viewChildCurrentPageInput:TerraNumberInputComponent;
    
    @Input() inputPagingData:TerraPagerInterface;
    @Input() inputDefaultPagingSize:number;
    @Input() inputPagingSize:Array<TerraSelectBoxValueInterface>;
    
    @Output() outputDoPaging = new EventEmitter<TerraPagerInterface>();
    
    constructor()
    {
    }
    
    ngOnInit()
    {
        if(!this.inputDefaultPagingSize)
        {
            this.inputDefaultPagingSize = 25;
        }
        
        if(!this.inputPagingSize)
        {
            this.inputPagingSize = [
                {
                    value:   25,
                    caption: '25'
                },
                {
                    value:   50,
                    caption: '50'
                },
                {
                    value:   75,
                    caption: '75'
                },
                {
                    value:   100,
                    caption: '100'
                }
            ];
        }
        
        if(!this.inputPagingData)
        {
            this.inputPagingData = {
                pagingUnit:  'Entries',
                total:       0,
                currentPage: 1,
                perPage:     0,
                lastPage:    0,
                from:        0,
                to:          0
            };
        }
        
        this.updateCurrentPageInput();
    }
    
    private updateCurrentPageInput()
    {
        this.viewChildCurrentPageInput.value = this.inputPagingData.currentPage;
    }
    
    public onFirstPage():void
    {
        this.inputPagingData.currentPage = 1;
        this.updateCurrentPageInput();
        
        this.outputDoPaging
            .emit(this.inputPagingData);
    }
    
    public onPrevPage():void
    {
        this.inputPagingData.currentPage -= 1;
        this.updateCurrentPageInput();
        
        this.outputDoPaging
            .emit(this.inputPagingData);
    }
    
    public onNextPage():void
    {
        this.inputPagingData.currentPage += 1;
        this.updateCurrentPageInput();
        
        this.outputDoPaging
            .emit(this.inputPagingData);
    }
    
    public onLastPage():void
    {
        this.inputPagingData.currentPage = this.inputPagingData.lastPage;
        this.updateCurrentPageInput();
        
        this.outputDoPaging
            .emit(this.inputPagingData);
    }
    
    public onReload():void
    {
        this.outputDoPaging
            .emit(this.inputPagingData);
    }
    
    public onToPage(event:any,
                    pageNumber:number):void
    {
        event.preventDefault();
        
        this.inputPagingData.currentPage = pageNumber;
        
        this.outputDoPaging
            .emit(this.inputPagingData);
    }
    
    public onChangeOffsetTo(selectedOffset:TerraSelectBoxValueInterface):void
    {
        this.inputPagingData.currentPage = 1;
        this.updateCurrentPageInput();
        this.inputPagingData.perPage = selectedOffset.value;
        
        this.outputDoPaging.emit(this.inputPagingData);
    }
}
