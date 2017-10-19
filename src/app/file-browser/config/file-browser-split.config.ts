
import {
    ChangeDetectorRef,
    Injectable
} from '@angular/core';
import { TerraSplitConfigBase } from '../../split-view/data/terra-split-config-base';
import { TerraSplitViewInterface } from '../../split-view/data/terra-split-view.interface';
import { TerraImagePreviewModule } from '../image-preview/image-preview.module';
import { TerraFileListModule } from '../file-list/file-list.module';
import { TerraImageEditorModule } from '../image-editor/image-editor.module';
import { TerraMultiSplitViewConfig } from '../../split-view/multi/data/terra-multi-split-view.config';
import { TerraMultiSplitViewInterface } from '../../split-view/multi/data/terra-multi-split-view.interface';

const SPLIT_WIDTH_FULL      = "col-xs-12 col-md-12 col-lg-12";
const SPLIT_WIDTH_CONTENT   = "col-xs-12 col-md-9 col-lg-10";
const SPLIT_WIDTH_SIDEBAR   = "col-xs-12 col-md-3 col-lg-2";

@Injectable()
export class FileBrowserSplitConfig extends TerraMultiSplitViewConfig
{
    private _fileListView: TerraMultiSplitViewInterface;
    private _imagePreviewView: TerraMultiSplitViewInterface;
    private _imageEditorView: TerraMultiSplitViewInterface;

    constructor( private _changeDetector: ChangeDetectorRef )
    {
        super();
    }

    public showFileList( inputValues: {[key: string]: any} = {} )
    {
        if ( this._imageEditorView )
        {
            this.hideImageEditor();
        }

        if ( !this._fileListView )
        {
            this._fileListView = {
                module: TerraFileListModule.forRoot(),
                defaultWidth: SPLIT_WIDTH_FULL,
                name: "File List",
                mainComponentName: TerraFileListModule.getMainComponent(),
                inputs: Object.keys(inputValues).map( key => {
                    return { name: key, value: inputValues[key] };
                })
            };

            this.addView( this._fileListView );
        }
        else
        {
            this._fileListView.inputs = Object.keys(inputValues).map( key => {
                return { name: key, value: inputValues[key] };
            });
        }

        this._changeDetector.detectChanges();
    }

    public hideFileList()
    {
        if ( this._imagePreviewView )
        {
            this.hideImagePreview();
        }

        if ( this._fileListView )
        {
            this.removeView( this._fileListView );
            this._fileListView = null;
        }

        this._changeDetector.detectChanges();
    }

    public showImagePreview( inputValues: {[key: string]: any} = {} )
    {
        if ( !this._fileListView )
        {
            this.showFileList();
        }

        this.resizeView( this._fileListView, SPLIT_WIDTH_CONTENT );

        if ( !this._imagePreviewView )
        {
            this._imagePreviewView = {
                module: TerraImagePreviewModule.forRoot(),
                defaultWidth: SPLIT_WIDTH_SIDEBAR,
                name: 'Image Preview',
                mainComponentName: TerraImagePreviewModule.getMainComponent(),
                inputs: Object.keys(inputValues).map( key => {
                    return { name: key, value: inputValues[key] };
                })
            };

            this.addView( this._imagePreviewView );
        }
        else
        {
            this._imagePreviewView.inputs = Object.keys(inputValues).map( key => {
                return { name: key, value: inputValues[key] };
            });
        }

        this._changeDetector.detectChanges();
    }

    public hideImagePreview()
    {
        if ( this._imagePreviewView )
        {
            this.removeView( this._imagePreviewView );
            this._imagePreviewView = null;
        }

        if ( this._fileListView )
        {
            this.resizeView( this._fileListView, SPLIT_WIDTH_FULL );
        }
        else
        {
            this.showFileList();
        }

        this._changeDetector.detectChanges();
    }

    public showImageEditor( inputValues: {[key: string]: any} = {} )
    {
        if ( this._fileListView )
        {
            this.hideFileList();
        }

        if ( !this._imageEditorView )
        {
            this._imageEditorView = {
                module: TerraImageEditorModule.forRoot(),
                defaultWidth: SPLIT_WIDTH_FULL,
                name: "Image Editor",
                mainComponentName: TerraImageEditorModule.getMainComponent(),
                inputs: Object.keys(inputValues).map( key => {
                    return { name: key, value: inputValues[key] };
                })
            };

            this.addView( this._imageEditorView );
        }
        else
        {
            this._imageEditorView.inputs = Object.keys(inputValues).map( key => {
                return { name: key, value: inputValues[key] };
            });
        }

        this._changeDetector.detectChanges();
    }

    public hideImageEditor()
    {
        if ( this._imageEditorView )
        {
            this.removeView( this._imageEditorView );
            this._imageEditorView = null;
        }

        this.showFileList();

        this._changeDetector.detectChanges();
    }
}