export type ResizeEdge = boolean | string | HTMLElement;

export interface ResizeOptions {
  edges: {
    top?: ResizeEdge;
    left?: ResizeEdge;
    bottom?: ResizeEdge;
    right?: ResizeEdge;
  };
  invert?: 'none' | 'negate' | 'reposition';
  squareResize?: boolean;
  preserveAspectRatio?: boolean;
}
