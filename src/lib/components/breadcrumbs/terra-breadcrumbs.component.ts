import { Component } from '@angular/core';
import { TerraBreadcrumbsService } from './service/terra-breadcrumbs.service';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { TerraBreadcrumb } from './terra-breadcrumb';
import { TerraBreadcrumbContainer } from './terra-breadcrumb-container';

@Component({
    selector: 'terra-breadcrumbs',
    styleUrls: ['./terra-breadcrumbs.component.scss'],
    templateUrl: './terra-breadcrumbs.component.html',
    providers: [TerraBreadcrumbsService]
})
export class TerraBreadcrumbsComponent {
    public _mouseLeft: string = '0px';

    constructor(public readonly breadcrumbsService: TerraBreadcrumbsService, private _activatedRoute: ActivatedRoute) {
        this.breadcrumbsService.activatedRoute = this._activatedRoute.snapshot;
    }

    public get _breadcrumbContainers(): Array<TerraBreadcrumbContainer> {
        return this.breadcrumbsService.containers;
    }

    public _closeBreadcrumb(container: TerraBreadcrumbContainer, breadcrumb: TerraBreadcrumb, event: Event): void {
        event.stopPropagation();

        this.breadcrumbsService.closeBreadcrumb(container, breadcrumb);
    }

    public _checkActiveRoute(bcc: TerraBreadcrumb, container: HTMLLIElement): boolean {
        let isRouteActive: boolean = this.breadcrumbsService.checkActiveRoute(bcc);

        if (!isNullOrUndefined(container) && isRouteActive) {
            container.scrollIntoView();
        }

        return isRouteActive;
    }

    public _calculatePosition(container: HTMLLIElement, contextMenu: HTMLUListElement): void {
        let containerClientRect: ClientRect = container.getBoundingClientRect();
        let contextMenuClientRect: ClientRect = contextMenu.getBoundingClientRect();

        let isOutsideRight: boolean = contextMenuClientRect.width + containerClientRect.left > window.innerWidth;

        let left: number = 0;

        if (isOutsideRight) {
            left = window.innerWidth - contextMenuClientRect.width;
        } else {
            left = containerClientRect.left;
        }

        this._mouseLeft = left + 'px';
    }

    public _checkLastBreadcrumbContainer(index: number): boolean {
        let nextContainer: TerraBreadcrumbContainer = this._breadcrumbContainers[index + 1];

        return (
            !isNullOrUndefined(nextContainer) &&
            !isNullOrUndefined(nextContainer.currentSelectedBreadcrumb) &&
            !nextContainer.currentSelectedBreadcrumb.isHidden
        );
    }
}
