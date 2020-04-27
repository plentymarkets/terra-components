export type Rect =
  | {
      top: number;
      left: number;
      bottom: number;
      right: number;
    }
  | {
      x: number;
      y: number;
      width: number;
      height: number;
    };

export type ResctrictFunction = (x: number, y: number, element: HTMLElement) => Rect | HTMLElement;

export interface RestrictOptions {
  restriction: Rect | HTMLElement | ResctrictFunction | string;
  elementRect?: { top: number; left: number; right: number; bottom: number };
  endOnly?: boolean;
}
