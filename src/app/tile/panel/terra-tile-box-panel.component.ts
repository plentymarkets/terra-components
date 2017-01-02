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
    
    private draggedIndex;
    
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
    
    private onDrag(ev, tile:TerraTileBoxInterface)
    {
        this.draggedIndex = this.inputTileBoxList.indexOf(tile);
        let draggingTile:TerraTileBoxInterface = this.inputTileBoxList[this.draggedIndex];
        draggingTile.isDragging = true;
    }
    
    private onDrop(ev, droppedTile:TerraTileBoxInterface)
    {
        ev.preventDefault();
        
        let draggedTile:TerraTileBoxInterface = this.inputTileBoxList[this.draggedIndex];
        draggedTile.isDragging = false;
        
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
}