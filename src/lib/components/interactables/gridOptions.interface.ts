export interface GridOptions {
  x: number;
  y: number;
  range?: number;
  offset?: { x: number; y: number };
  endOnly?: boolean;
  relativePoints?: Array<{ x: number; y: number }>;
}
