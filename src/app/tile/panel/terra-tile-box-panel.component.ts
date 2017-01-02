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
    @Input() selectedTileBoxList:Array<TerraTileBoxInterface> = [];
    
    private draggedIndex;
    
    constructor()
    {
    }
    
    private onBoxClick(ev, tile:TerraTileBoxInterface)
    {
        tile.isSelected = !tile.isSelected;
        
        let index = this.selectedTileBoxList.indexOf(tile);
        
        if(tile.isSelected && index == -1)
        {
            this.selectedTileBoxList.push(tile);
        }
        else if(!tile.isSelected && index != -1)
        {
            this.selectedTileBoxList.splice(index, 1)
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
        
        this.inputTileBoxList[this.draggedIndex] = droppedTile;
        this.inputTileBoxList[droppedIndex] = draggedTile;
    }
    
    private allowDrop(ev)
    {
        ev.preventDefault();
    }
}