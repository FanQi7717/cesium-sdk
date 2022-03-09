import {
  Viewer,
  PolygonGeometry,
  PolylineGeometry,
  GeometryInstance,
} from "@hangkan/hkcim";

export interface IPrimitiveOptions {
  // primitiveType: "LineString" | "Polygon";
  viewer: Viewer;
  // color?: Color;
  // positions?: any[];
  geometry: PolygonGeometry | PolylineGeometry | any;
  attributeLocations?: any;
  instances?: GeometryInstance[] | any[];
  bufferUsage?: any;
}
