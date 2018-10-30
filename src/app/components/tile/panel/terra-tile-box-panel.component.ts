import {
    Component,
    Input
} from '@angular/core';
import { TerraTileBoxInterface } from '../box/data/terra-tile-box.interface';

/**
 * @author mkunze
 * @deprecated use `terra-card` instead.
 */
@Component({
    selector: 'terra-tile-box-panel',
    styles:   [require('./terra-tile-box-panel.component.scss')],
    template: require('./terra-tile-box-panel.component.html')
})
export class TerraTileBoxPanelComponent
{
    @Input()
    public inputTileBoxList:Array<TerraTileBoxInterface>;

    @Input()
    public inputIsViewToggleable:boolean;

    public selectedTileBoxList:Array<TerraTileBoxInterface> = [];
    public viewStyle:boolean = false;

    private draggedIndex:number;

    constructor()
    {
        this.inputIsViewToggleable = false;
    }

    private onBoxClick(event:Event, tile:TerraTileBoxInterface):void
    {
        tile.isSelected = !tile.isSelected;

        let index:number = this.selectedTileBoxList.indexOf(tile);

        if(tile.isSelected && index === -1)
        {
            this.selectedTileBoxList.push(tile);
        }
        else if(!tile.isSelected && index !== -1)
        {
            this.selectedTileBoxList.splice(index, 1);
        }
    }

    private onDragStart(event:DragEvent, draggingTile:TerraTileBoxInterface):void
    {
        this.draggedIndex = this.inputTileBoxList.indexOf(draggingTile);
        draggingTile.isDragging = true;

        for(let tile of this.inputTileBoxList)
        {
            if(tile !== draggingTile)
            {
                tile.isDropTarget = true;
            }
        }

        // awesome hack for firefox! it rocks!!!
        event.dataTransfer.setData('text', 'anything');
    }

    private onDragEnd(event:DragEvent, draggingTile:TerraTileBoxInterface):void
    {
        event.preventDefault();

        draggingTile.isDragging = false;

        for(let tile of this.inputTileBoxList)
        {
            tile.isDropTarget = false;
            tile.isHover = false;
        }
    }

    private onDragLeave(event:DragEvent, hoverTile:TerraTileBoxInterface):void
    {
        event.preventDefault();

        if(!hoverTile.isDragging)
        {
            hoverTile.isHover = false;
        }
    }

    private onDrop(event:Event, droppedTile:TerraTileBoxInterface):void
    {
        event.preventDefault();

        let draggedTile:TerraTileBoxInterface = this.inputTileBoxList[this.draggedIndex];
        draggedTile.isDragging = false;

        for(let tile of this.inputTileBoxList)
        {
            tile.isDropTarget = false;
            tile.isHover = false;
        }

        let droppedIndex:number = this.inputTileBoxList.indexOf(droppedTile);

        this.inputTileBoxList.splice(this.draggedIndex, 1);
        this.inputTileBoxList.splice(droppedIndex, 0, draggedTile);
    }

    private onDragOver(event:Event, hoverTile:TerraTileBoxInterface):void
    {
        event.preventDefault();

        if(!hoverTile.isDragging)
        {
            hoverTile.isHover = true;

            for(let tile of this.inputTileBoxList)
            {
                if(tile !== hoverTile)
                {
                    tile.isHover = false;
                }
            }
        }
    }

    private toggleView():void
    {
        this.viewStyle = !this.viewStyle;
    }
}
