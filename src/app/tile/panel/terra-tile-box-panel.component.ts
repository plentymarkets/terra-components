import {
    Component,
    Input
} from '@angular/core';
import { TerraTileBoxInterface } from '../box/data/terra-tile-box.interface';
/**
 * @author mkunze
 */
@Component({
               selector: 'terra-tile-box-panel',
               styles:   [require('./terra-tile-box-panel.component.scss').toString()],
               template: require('./terra-tile-box-panel.component.html')
           })
export class TerraTileBoxPanelComponent
{
    @Input() inputTileBoxList:Array<TerraTileBoxInterface>;
    private _selectedTileBoxList:Array<TerraTileBoxInterface> = [];
    
    private draggedIndex:number;
    private _viewStyle:boolean = false;
    
    constructor()
    {
    }
    
    private onBoxClick(ev, tile:TerraTileBoxInterface)
    {
        tile.isSelected = !tile.isSelected;
        
        let index = this._selectedTileBoxList.indexOf(tile);
        
        if(tile.isSelected && index == -1)
        {
            this._selectedTileBoxList.push(tile);
        }
        else if(!tile.isSelected && index != -1)
        {
            this._selectedTileBoxList.splice(index, 1)
        }
    }
    
    private onDrag(ev, draggingTile:TerraTileBoxInterface)
    {
        this.draggedIndex = this.inputTileBoxList.indexOf(draggingTile);
        draggingTile.isDragging = true;
        
        for(let tile of this.inputTileBoxList)
        {
            if(tile != draggingTile)
            {
                tile.isDropTarget = true;
            }
        }
    }
    
    private onDrop(ev, droppedTile:TerraTileBoxInterface)
    {
        ev.preventDefault();
        
        let draggedTile:TerraTileBoxInterface = this.inputTileBoxList[this.draggedIndex];
        draggedTile.isDragging = false;
    
        for(let tile of this.inputTileBoxList)
        {
            tile.isDropTarget = false;
        }
        
        let droppedIndex = this.inputTileBoxList.indexOf(droppedTile);
        
        this.inputTileBoxList.splice(this.draggedIndex, 1);
        this.inputTileBoxList.splice(droppedIndex, 0, draggedTile);
    }
    
    private allowDrop(ev)
    {
        ev.preventDefault();
    }
    
    
    public get selectedTileBoxList():Array<TerraTileBoxInterface>
    {
        return this._selectedTileBoxList;
    }
    
    public set selectedTileBoxList(value:Array<TerraTileBoxInterface>)
    {
        this._selectedTileBoxList = value;
    }
    
    
    public get viewStyle():boolean
    {
        return this._viewStyle;
    }
    
    public set viewStyle(value:boolean)
    {
        this._viewStyle = value;
    }
    
    private toggleView():void
    {
        this.viewStyle = !this.viewStyle;
    }
}