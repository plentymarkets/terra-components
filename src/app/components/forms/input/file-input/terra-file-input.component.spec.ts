import { ElementRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap';
import { LocalizationModule } from 'angular-l10n';
import { l10nConfig } from '../../../../translation/l10n.config';
import { MockElementRef } from '../../../../testing/mock-element-ref';
import { TerraLabelTooltipDirective } from '../../../../helpers/terra-label-tooltip.directive';
import { TerraFileInputComponent } from './terra-file-input.component';
import { TerraThreeColumnsContainerComponent } from '../../../layouts/column-container/three-columns/terra-three-columns-container.component';
import { TerraNodeTreeComponent } from '../../../tree/node-tree/terra-node-tree.component';
import {
    TerraBaseToolbarComponent,
    TerraButtonComponent,
    TerraFileBrowserComponent,
    TerraFileChooserComponent,
    TerraOverlayComponent,
    TerraPortletComponent,
    TerraSimpleTableComponent
} from '../../../../..';
import { TerraImagePreviewComponent } from '../../../file-browser/image-preview/image-preview.component';
import { TerraFileListComponent } from '../../../file-browser/file-list/file-list.component';
import { TerraTextInputComponent } from '../text-input/terra-text-input.component';

describe('TerraDoubleInputComponent', () =>
{
    let component:TerraFileInputComponent;
    let fixture:ComponentFixture<TerraFileInputComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                TerraFileInputComponent,
                TerraFileChooserComponent,
                TerraFileBrowserComponent,
                TerraFileListComponent,
                TerraImagePreviewComponent,
                TerraButtonComponent,
                TerraOverlayComponent,
                TerraThreeColumnsContainerComponent,
                TerraNodeTreeComponent,
                TerraSimpleTableComponent,
                TerraPortletComponent,
                TerraTextInputComponent,
                TerraBaseToolbarComponent,
                TerraLabelTooltipDirective
            ],
            imports:      [
                TooltipModule.forRoot(),
                FormsModule,
                HttpModule,
                HttpClientModule,
                LocalizationModule.forRoot(l10nConfig)
            ],
            providers:    [
                {
                    provide:  ElementRef,
                    useClass: MockElementRef
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(TerraFileInputComponent);
        component = fixture.componentInstance;

        component.value = null;

        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
