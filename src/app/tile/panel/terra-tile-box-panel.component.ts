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
               styles:   [require('./terra-tile-box-panel.component.scss')],
               template: require('./terra-tile-box-panel.component.html')
           })
export class TerraTileBoxPanelComponent
{
    @Input() inputTileBoxList:Array<TerraTileBoxInterface>;
    @Input() inputIsViewToggleable:boolean;
    private _selectedTileBoxList:Array<TerraTileBoxInterface> = [];

    private _draggedIndex:number;
    private _viewStyle:boolean = false;

    constructor()
    {
        this.inputIsViewToggleable = false;
    }

    private onBoxClick(event, tile:TerraTileBoxInterface):void
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

    private onDragStart(event, draggingTile:TerraTileBoxInterface):void
    {
        this._draggedIndex = this.inputTileBoxList.indexOf(draggingTile);
        draggingTile.isDragging = true;

        for(let tile of this.inputTileBoxList)
        {
            if(tile != draggingTile)
            {
                tile.isDropTarget = true;
            }
        }

        //awesome hack for firefox! it rocks!!!
        event.dataTransfer.setData('text', 'anything');
    }

    private onDragEnd(event, draggingTile:TerraTileBoxInterface):void
    {
        event.preventDefault();

        draggingTile.isDragging = false;

        for(let tile of this.inputTileBoxList)
        {
            tile.isDropTarget = false;
            tile.isHover = false;
        }
    }

    private onDragLeave(event, hoverTile:TerraTileBoxInterface):void
    {
        event.preventDefault();

        if(!hoverTile.isDragging)
        {
            hoverTile.isHover = false;
        }
    }

    private onDrop(event, droppedTile:TerraTileBoxInterface):void
    {
        event.preventDefault();

        let draggedTile:TerraTileBoxInterface = this.inputTileBoxList[this._draggedIndex];
        draggedTile.isDragging = false;

        for(let tile of this.inputTileBoxList)
        {
            tile.isDropTarget = false;
            tile.isHover = false;
        }

        let droppedIndex = this.inputTileBoxList.indexOf(droppedTile);

        this.inputTileBoxList.splice(this._draggedIndex, 1);
        this.inputTileBoxList.splice(droppedIndex, 0, draggedTile);
    }

    private onDragOver(event, hoverTile:TerraTileBoxInterface):void
    {
        event.preventDefault();

        if(!hoverTile.isDragging)
        {
            hoverTile.isHover = true;

            for(let tile of this.inputTileBoxList)
            {
                if(tile != hoverTile)
                {
                    tile.isHover = false;
                }
            }
        }
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