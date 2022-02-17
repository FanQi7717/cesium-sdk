import { BaseObject } from "./lib/BaseObject";
import { IPrimitiveOptions } from "./types/IPrimitive";
import { lineVertexShader, fragmentShader } from "./shader/usePrimitiveShader";
import { Viewer, Color } from "@hangkan/hkcim";

export class UsePrimitive extends BaseObject {
  private pointCommand: any; //DrawCommand
  private _viewer: Viewer = null;
  private _color: Color = Cesium.Color.WHITE;
  private _positions: any[] = [];
  //   private _container: HTMLElement;

  constructor(options: IPrimitiveOptions) {
    super();
    this._viewer = options.viewer;
    this._color = options?.color;
    this._positions = options?.positions;
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
    const shaderProgram = Cesium.shaderProgram.fromCache({
      context,
      vertexShaderSource: lineVertexShader(),
      fragmentShaderSource: fragmentShader(this._color),
    });
    const renderState = Cesium.renderState.fromCache({
      depthTest: { enabled: false },
      depthMask: false,
      blending: Cesium.BlendingState.ALPHA_BLEND,
    });

    const indexBuffer = Cesium.Buffer.createIndexBuffer({
      context,
      typedArray: new Uint32Array([0, 1, 2]),
      usage: Cesium.BufferUsage.STATIC_DRAW,
      indexDatatype: Cesium.IndexDatatype.UNSIGNED_INT,
    });
    const vertexBuffer = Cesium.Buffer.createVertexBuffer({
      context,
      typedArray: Cesium.ComponentDatatype.createTypedArray(
        Cesium.ComponentDatatype.FLOAT,
        [0, 0, 0, 100, 100, 100, 200, 200, 200]
      ),
    });
    const vertexArray = new Cesium.VertexArray({
      context,
      attributes: [
        {
          index: 0,
          vertexBuffer,
          componentDatatype: Cesium.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          normalize: false,
        },
      ],
      indexBuffer,
    });

    this.pointCommand = new Cesium.DrawCommand({
      boundingVolume: new Cesium.BoundingSphere(
        Cesium.Cartesian3.fromDegrees(120.16, 30.29, 50000), //球的中心
        50000 //球的半径
      ),
    });
  };

  //   get viewer(): any {
  //     return this._viewer;
  //   }

  //   get container(): HTMLElement {
  //     return this._container;
  //   }

  protected _disposeInternal() {
    this._viewer?.destroy();
  }
}
