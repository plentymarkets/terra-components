import { TerraTagInterface } from '../../../layouts/tag/data/terra-tag.interface';
import { Component } from '@angular/core';

/**
 * @author mfrank
 */
@Component({
    selector: 'terra-tag-select-example',
    templateUrl: './terra-tag-select.component.example.html'
})
export class TerraTagSelectComponentExample {
    public _selectedTags: Array<TerraTagInterface> = [
        {
            id: 3,
            name: 'Fast schwarz',
            color: '#000350',
            isClosable: true,
            names: [
                {
                    id: 3,
                    tagId: 3,
                    language: 'de',
                    name: 'Fast schwarz'
                },
                {
                    id: 7,
                    tagId: 3,
                    language: 'en',
                    name: 'Almost black'
                }
            ]
        }
    ];

    public _tags: Array<TerraTagInterface> = [
        {
            id: 4,
            name: 'Dunkel grau',
            color: '#989898',
            names: [
                {
                    id: 4,
                    tagId: 4,
                    language: 'de',
                    name: 'Dunkel grau'
                },
                {
                    id: 5,
                    tagId: 4,
                    language: 'en',
                    name: 'Dark grey'
                }
            ]
        },
        {
            id: 3,
            name: 'Fast schwarz',
            color: '#000350',
            names: [
                {
                    id: 3,
                    tagId: 3,
                    language: 'de',
                    name: 'Fast schwarz'
                },
                {
                    id: 7,
                    tagId: 3,
                    language: 'en',
                    name: 'Almost black'
                }
            ]
        },
        {
            id: 2,
            name: 'Helles grau',
            color: '#f0eef1',
            names: [
                {
                    id: 2,
                    tagId: 2,
                    language: 'de',
                    name: 'Helles grau'
                },
                {
                    id: 8,
                    tagId: 2,
                    language: 'en',
                    name: 'Light grey'
                }
            ]
        },
        {
            id: 1,
            name: 'Rot',
            color: '#ff4b31',
            names: [
                {
                    id: 1,
                    tagId: 1,
                    language: 'de',
                    name: 'Rot'
                },
                {
                    id: 6,
                    tagId: 1,
                    language: 'en',
                    name: 'Red'
                }
            ]
        }
    ];
}
