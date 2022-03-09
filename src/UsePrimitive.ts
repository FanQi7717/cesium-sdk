import { BaseObject } from "./lib/BaseObject";
import { IPrimitiveOptions } from "./types/IPrimitive";
import {
  getDefaultVShader,
  getDefaultFShader,
} from "./shader/usePrimitiveShader";
import {
  Viewer,
  Color,
  PolygonGeometry,
  PolylineGeometry,
  GeometryInstance,
} from "@hangkan/hkcim";

export class UsePrimitive extends BaseObject {
  private pointCommand: any; //DrawCommand
  private _viewer: Viewer = null;
  private _geometry: PolygonGeometry | PolylineGeometry | any;
  private _attributeLocations: any;
  private _bufferUsage: any;
  private _instances: GeometryInstance[] | any[];

  constructor(options: IPrimitiveOptions) {
    super();

    this._viewer = options.viewer;
    this._geometry = options.geometry;

    this._attributeLocations =
      options?.attributeLocations ??
      Cesium.GeometryPipeline.createAttributeLocations(this._geometry);

    this._instances = options?.instances ?? [
      new Cesium.GeometryInstance({
        geometry: this._geometry,
      }),
    ];

    this._bufferUsage =
      options?.bufferUsage ?? (Cesium as any).BufferUsage.STATIC_DRAW;
  }

  update = (frameState: any) => {
    if (this.pointCommand) {
      frameState.commandList.push(this.pointCommand);
      this._viewer.scene.requestRender();
    } else {
      this.getPointCommand(frameState.context);
    }
  };

  getPointCommand = (context: any) => {
    const shaderProgram = Cesium.ShaderProgram.fromCache({
      context,
      vertexShaderSource: getDefaultVShader(),
      fragmentShaderSource: getDefaultFShader(),
    });
    const renderState = Cesium.RenderState.fromCache({
      depthTest: { enabled: false },
      depthMask: false,
      blending: Cesium.BlendingState.ALPHA_BLEND,
    });
    const vertexArray = Cesium.VertexArray.fromGeometry({
      context,
      attributeLocations: this._attributeLocations,
      geometry: this._geometry,
      bufferUsage: this._bufferUsage,
    });

    this.pointCommand = new Cesium.DrawCommand({
      primitiveType: this._geometry.primitiveType,
      shaderProgram,
      renderState,
      vertexArray,
      pass: Cesium.Pass.OPAQUE,
    });
  };

  get geometry(): any {
    return this._geometry;
  }

  protected _disposeInternal() {
    this._viewer?.destroy();
  }
}
