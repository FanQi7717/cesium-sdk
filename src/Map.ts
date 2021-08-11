import { BaseObject } from "./lib/BaseObject";
import { IMapOptions } from "./types/IMap";

export class Map extends BaseObject {
  private _viewer: any = null;
  private _container: HTMLElement;

  constructor(options: IMapOptions) {
    super();
    if (!window.Cesium)
      throw "未挂载Cesium对象，请在html中通过script引入Cesium脚本";

    const { target } = options;

    this._container =
      typeof target === "string" ? document.getElementById(target) : target;

    this._viewer = new Cesium.Viewer(target, {
      infoBox: false, //是否显示信息框
      navigation: false,
      selectionIndicator: false, //去掉那个绿框
      // terrainProvider: terrainProvider, //地形DEM
    });
  }

  get viewer(): any {
    return this._viewer;
  }

  get container(): HTMLElement {
    return this._container;
  }

  protected _disposeInternal() {
    this.viewer?.destroy();
  }
}
