import {
    Component,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector:      'terra-app-root',
    template:      require('./terra-components.component.html'),
    styles:        [require('./terra-components.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class TerraComponentsComponent
{
    private viewContainerRef:ViewContainerRef;

    protected config:{};

    constructor(viewContainerRef:ViewContainerRef)
    {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;

        this.config = {
            toolbarGroups: [
                {
                    name:   'styles',
                    groups: ['styles']
                },
                {
                    name:   'colors',
                    groups: ['colors']
                },
                {
                    name:   'basicstyles',
                    groups: ['basicstyles',
                             'cleanup']
                },
                {
                    name:   'paragraph',
                    groups: ['list',
                             'indent',
                             'blocks',
                             'align',
                             'bidi',
                             'paragraph']
                },
                {
                    name:   'clipboard',
                    groups: ['clipboard',
                             'undo']
                },
                {
                    name:   'editing',
                    groups: ['find',
                             'selection',
                             'spellchecker',
                             'editing']
                },
                {
                    name:   'links',
                    groups: ['links']
                },
                {
                    name:   'document',
                    groups: ['mode',
                             'document',
                             'doctools']
                },
                {
                    name:   'forms',
                    groups: ['forms']
                },
                {
                    name:   'insert',
                    groups: ['insert']
                },
                {
                    name:   'tools',
                    groups: ['tools']
                },
                {
                    name:   'others',
                    groups: ['others']
                },
                {
                    name:   'about',
                    groups: ['about']
                }
            ]
        };
    }
}
