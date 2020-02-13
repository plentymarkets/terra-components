import {
    Component,
    Inject
} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogRef
} from '@angular/material/dialog';

export interface DialogData
{
    animal:string;
    name:string;
}

@Component({
    selector:    'tc-overlay',
    templateUrl: 'overlay.component.html',
})
export class OverlayComponent
{
    constructor(public dialogRef:MatDialogRef<OverlayComponent>,
                @Inject(MAT_DIALOG_DATA) public data:DialogData)
    {
    }

    public onNoClick():void
    {
        this.dialogRef.close();
    }
}
