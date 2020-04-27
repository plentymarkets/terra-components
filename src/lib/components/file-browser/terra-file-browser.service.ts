import { Injectable, NgZone } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TerraFileBrowserService {
  public isDragActive: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private _dropzones: Array<HTMLElement> = [];
  private _globalListenersDefined: boolean = false;
  private _dragenterTarget: EventTarget = null;

  constructor(private _zone: NgZone) {}

  public addDropzone(dropzone: HTMLElement): void {
    if (!this._globalListenersDefined) {
      this._setupGlobalListeners();
    }
    this._dropzones.push(dropzone);
  }

  public removeDropzone(dropzone: HTMLElement): void {
    let idx: number = this._dropzones.indexOf(dropzone);
    if (idx >= 0) {
      this._dropzones.splice(idx, 1);
    }
  }

  private _isDropzone(element: HTMLElement): boolean {
    return this._dropzones.some((dropzone: HTMLElement) => {
      return dropzone.contains(element);
    });
  }

  private _setupGlobalListeners(): void {
    this._zone.runOutsideAngular(() => {
      let setEffect: (event: Event) => void = (event: DragEvent): void => {
        if (this._isDropzone(<HTMLElement>event.target)) {
          event.dataTransfer.effectAllowed = 'copy';
          event.dataTransfer.dropEffect = 'copy';
        } else {
          event.dataTransfer.effectAllowed = 'none';
          event.dataTransfer.dropEffect = 'none';
        }
      };

      let isFileEvent: (event: DragEvent) => boolean = (event: DragEvent): boolean => {
        return (
          !isNullOrUndefined(event.dataTransfer.types) &&
          event.dataTransfer.types.indexOf('Files') >= 0
        );
      };

      window.addEventListener('dragenter', (event: DragEvent) => {
        if (isFileEvent(event)) {
          this._dragenterTarget = event.target;
          event.preventDefault();
          if (!this.isDragActive.value) {
            this.isDragActive.next(true);
          }
        }
      });

      window.addEventListener('dragover', (event: DragEvent) => {
        if (isFileEvent(event)) {
          event.preventDefault();
          setEffect(event);
        }
      });

      window.addEventListener('dragleave', (event: DragEvent) => {
        if (isFileEvent(event) && event.target === this._dragenterTarget) {
          this._dragenterTarget = null;
          this.isDragActive.next(false);
        }
      });

      window.addEventListener('drop', (event: DragEvent) => {
        if (isFileEvent(event)) {
          event.preventDefault();
          this._dragenterTarget = null;
          if (this.isDragActive.value) {
            this.isDragActive.next(false);
          }
        }
      });
    });
    this._globalListenersDefined = true;
  }
}
