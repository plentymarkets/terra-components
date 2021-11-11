import { TerraNodeComponent } from './terra-node.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { L10nTranslationModule } from 'angular-l10n';
import { TerraPlacementEnum } from '../../../../helpers';
import { mockL10nConfig } from '../../../../testing/mock-l10n-config';
import { MockTooltipDirective } from '../../../../testing/mock-tooltip.directive';

describe('TerraNodeComponent', () => {
    let component: TerraNodeComponent<any>;
    let fixture: ComponentFixture<TerraNodeComponent<any>>;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [L10nTranslationModule.forRoot(mockL10nConfig)],
            declarations: [MockTooltipDirective, TerraNodeComponent]
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
