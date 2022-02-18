import * as C from "@hangkan/cesium";

declare global {
  const Cesium: typeof C;
  // const map: any;
  interface Window {
    Cesium: typeof C;
    // map: any;
  }
}
