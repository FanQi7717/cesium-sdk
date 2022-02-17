import { Viewer, Color } from "@hangkan/hkcim";

export interface IPrimitiveOptions {
  primitiveType: "LineString" | "Polygon";
  viewer: Viewer;
  color?: Color;
  positions?: any[];
}
