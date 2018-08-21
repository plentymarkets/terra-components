import { Injectable } from '@angular/core';
import { TerraMultiSplitViewConfig } from '../../split-view/multi/injectables/terra-multi-split-view.config';
import { TerraMultiSplitViewInterface } from '../../split-view/multi/interfaces/terra-multi-split-view.interface';
import { TerraStorageObject } from '../model/terra-storage-object';
import { TerraBaseStorageService } from '../terra-base-storage.interface';

const SPLIT_WIDTH_FULL:string = 'col-xs-12 col-md-12 col-lg-12';
const SPLIT_WIDTH_CONTENT:string = 'col-xs-12 col-md-9 col-lg-10';
const SPLIT_WIDTH_SIDEBAR:string = 'col-xs-12 col-md-3 col-lg-2';

@Injectable()
export class FileBrowserSplitConfig extends TerraMultiSplitViewConfig
{
    private fileListView:TerraMultiSplitViewInterface;
    private imagePreviewView:TerraMultiSplitViewInterface;
    private storageServices:Array<TerraBaseStorageService>;

    public init(storageServices:Array<TerraBaseStorageService>):void
    {
        this.storageServices = storageServices;
        this.fileListView = {
            module:            require('../file-list/file-list.module').TerraFileListModule.forRoot(),
            defaultWidth:      SPLIT_WIDTH_CONTENT,
            focusedWidth:      SPLIT_WIDTH_FULL,
            name:              'File List',
            mainComponentName: require('../file-list/file-list.module').TerraFileListModule.getMainComponent(),
            inputs:            [
                {
                    name:  'inputStorageServices',
                    value: this.storageServices
                }
            ]
        };
        this.addView(this.fileListView);

        this.imagePreviewView = {
            module:            require('../image-preview/image-preview.module').TerraImagePreviewModule.forRoot(),
            defaultWidth:      '',
            focusedWidth:      SPLIT_WIDTH_SIDEBAR,
            name:              'Image Preview',
            mainComponentName: require('../image-preview/image-preview.module').TerraImagePreviewModule.getMainComponent(),
            inputs:            [
                {
                    name:  'inputStorageObject',
                    value: null
                },
                {
                    name:  'inputStorageService',
                    value: null
                }
            ]
        };
        this.addView(this.imagePreviewView, this.fileListView);

        setTimeout((():void =>
        {
            this.setSelectedView(this.fileListView);
        }).bind(this));

    }

    public showImagePreview(storageObject:TerraStorageObject, storageService:TerraBaseStorageService):void
    {
        this.imagePreviewView.inputs = [
            {
                name:  'inputStorageService',
                value: storageService
            },
            {
                name:  'inputStorageObject',
                value: storageObject
            }
        ];

        if(storageService.isImagePreviewEnabled)
        {
            this.setSelectedView(this.imagePreviewView);
        }
    }

    public hideImagePreview():void
    {
        this.setSelectedView(this.fileListView);
    }
}
