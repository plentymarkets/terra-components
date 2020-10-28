import { TerraNodeComponent } from './terra-node.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipDirective } from '../../../tooltip/tooltip.directive';
import { L10nTranslationModule } from 'angular-l10n';
import { MockRouter } from '../../../../testing/mock-router';
import { Router } from '@angular/router';
import { TerraPlacementEnum } from '../../../../helpers';
import { mockL10nConfig } from 'src/lib/testing/mock-l10n-config';

describe('TerraNodeComponent', () => {
    let component: TerraNodeComponent<any>;
    let fixture: ComponentFixture<TerraNodeComponent<any>>;
    const router: MockRouter = new MockRouter();

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [L10nTranslationModule.forRoot(mockL10nConfig)],
            declarations: [TooltipDirective, TerraNodeComponent],
            providers: [
                {
                    provide: Router,
                    useValue: router
                }
            ]
        }).createComponent(TerraNodeComponent);

        component = fixture.componentInstance;
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    it('should initialise its public variables', () => {
        expect(component._tooltipPlacement).toBe(TerraPlacementEnum.RIGHT);
        expect(component._onlyEllipsisTooltip).toBe(true);
    });
});
