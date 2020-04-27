import { Directive, Host, OnDestroy, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TwoColumnHelper } from '../../../../helpers/two-column.helper';
import { TerraTwoColumnsContainerComponent } from './terra-two-columns-container.component';
import { isNullOrUndefined } from 'util';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
  selector: 'terra-2-col[mobileRouting]'
})
export class TerraTwoColumnsContainerDirective implements OnInit, OnDestroy {
  private _basePath: string;
  private _dataSub: Subscription;
  private _eventsSub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    @Host() @Optional() private _twoColComponent: TerraTwoColumnsContainerComponent
  ) {
    this._basePath = _router.url;
  }

  public ngOnInit(): void {
    let navigationEndEvents$: Observable<RouterEvent> = this._router.events.pipe(
      filter((event: RouterEvent) => {
        return event instanceof NavigationEnd && event.urlAfterRedirects === this._basePath;
      })
    );

    this._eventsSub = navigationEndEvents$.subscribe((event: NavigationEnd) => {
      if (event.url !== event.urlAfterRedirects) {
        this._setColumnHidden('right');
      } else {
        this._setColumnHidden('left');
      }
    });

    this._dataSub = this._route.data.subscribe((data: Data) => {
      this._basePath = this._router.url;
    });

    this._setColumnHidden('left');
  }

  public ngOnDestroy(): void {
    this._eventsSub.unsubscribe();
    this._dataSub.unsubscribe();
  }

  private _setColumnHidden(column: string): void {
    if (!isNullOrUndefined(this._twoColComponent)) {
      if (column === 'right') {
        this._twoColComponent._leftColumn =
          TwoColumnHelper.leftRightColXS() +
          TwoColumnHelper.leftColMD(this._twoColComponent.leftColumnWidth) +
          TwoColumnHelper.leftColLG(this._twoColComponent.leftColumnWidth);
        this._twoColComponent._rightColumn =
          TwoColumnHelper.leftRightHiddenXS() +
          TwoColumnHelper.rightColMD(this._twoColComponent.leftColumnWidth) +
          TwoColumnHelper.rightColLG(this._twoColComponent.leftColumnWidth);
      } else if (column === 'left') {
        this._twoColComponent._leftColumn =
          TwoColumnHelper.leftRightHiddenXS() +
          TwoColumnHelper.leftColMD(this._twoColComponent.leftColumnWidth) +
          TwoColumnHelper.leftColLG(this._twoColComponent.leftColumnWidth);
        this._twoColComponent._rightColumn =
          TwoColumnHelper.leftRightColXS() +
          TwoColumnHelper.rightColMD(this._twoColComponent.leftColumnWidth) +
          TwoColumnHelper.rightColLG(this._twoColComponent.leftColumnWidth);
      }
    }
  }
}
