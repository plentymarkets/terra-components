import {
    Component,
    ViewEncapsulation
} from '@angular/core';
import {
    MatDialog,
    MatDialogRef
} from '@angular/material/dialog';
import { OverlayComponent } from './overlay.component';

/**
 * @description This is a sandbox app which can be used to test out functionality from the TerraComponents library.
 * By default, it displays all the examples provided by the library.
 *
 * NOTE: This app is not compiled when running `npm run build`. Hence, it will also not be published.
 */
@Component({
    selector:      'tc-sandbox-app',
    templateUrl:   './app.component.html',
    styleUrls:     ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent
{
    public animal:string;
    public name:string;

    constructor(public dialog:MatDialog)
    {
    }

    public openDialog():void
    {
        const dialogRef:MatDialogRef<OverlayComponent, any> = this.dialog.open(OverlayComponent, {
            data:  {
                name:   this.name,
                animal: this.animal
            }
        });

        dialogRef.afterClosed().subscribe((result:string) =>
        {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }
}
