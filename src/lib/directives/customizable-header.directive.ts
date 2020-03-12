import {
  AfterContentInit,
  AfterViewInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';
import {
  CdkDrag,
  DragDrop,
  moveItemInArray,
  DropListRef,
  DragRef
} from '@angular/cdk/drag-drop';
import {
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatTable
} from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table/typings/cell';
import { CdkHeaderRowDef } from '@angular/cdk/table';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[tcCustomizableHeader]'
})
export class CustomizableHeaderDirective implements AfterViewInit
{
  private dropListRef:DropListRef;
  private headerRow:MatHeaderRow;
  private columns:Array<string> = [];

  constructor(private table:MatTable<any>, private dndService:DragDrop)
  {
  }

  public ngAfterViewInit():void
  {
    this.headerRow = (this.table._headerRowOutlet.elementRef.nativeElement as HTMLElement).nextElementSibling;
    this.dropListRef = this.createDropList(this.headerRow, this.createDrags(this.getHeaderCells(this.headerRow as Element)));
    this.columns = this.table._contentHeaderRowDefs.first.columns as Array<string>;
    console.log(this.columns);
  }

  private getHeaderCells(rowElem:Element):Array<MatHeaderCell>
  {
    const headerCells:Array<MatHeaderCell> = [];
    for(let i:number = 0; i < rowElem.children.length; i++)
    {
      headerCells.push(rowElem.children.item(i));
    }
    return headerCells;
  }

  public drop(event:any):void
  {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    setTimeout(() =>
    {
      this.dropListRef.dispose();
      this.createDropList(this.headerRow, this.createDrags(this.getHeaderCells(this.headerRow as Element)));
    }, 0);
  }

  private createDrags(cellRefs:Array<MatHeaderCell>):Array<DragRef>
  {
    return cellRefs.map((cellRef:MatHeaderCell) =>
    {
      const drag:DragRef = this.dndService.createDrag(cellRef as ElementRef);
      drag.lockAxis = 'x';
      return drag;
    });
  }

  private createDropList(headerRowDef:MatHeaderRow, drags:Array<DragRef>):DropListRef
  {
    const dropListRef:DropListRef = this.dndService.createDropList(headerRowDef as ElementRef);
    dropListRef.withItems(drags);
    dropListRef.withOrientation('horizontal');
    dropListRef.dropped.subscribe((event:{
      item:DragRef;
      currentIndex:number;
      previousIndex:number;
      container:DropListRef<any>;
      previousContainer:DropListRef<any>;
      isPointerOverContainer:boolean;
    }) => this.drop(event));
    return dropListRef;
  }
}
