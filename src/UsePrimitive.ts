import { BaseObject } from "./lib/BaseObject";
import { IPrimitiveOptions } from "./types/IPrimitive";
import { lineVertexShader, fragmentShader } from "./shader/usePrimitiveShader";
import { Viewer, Color } from "@hangkan/hkcim";

export class UsePrimitive extends BaseObject {
  private pointCommand: any; //DrawCommand
  private _viewer: Viewer = null;
  private _color: Color = Cesium.Color.WHITE;
  private _positions: any[] = [];
  private _indexBufferArr: any;
  private _vertexBufferArr: any;
  //   private _container: HTMLElement;

  constructor(options: IPrimitiveOptions) {
    super();
    this._viewer = options.viewer;
    this._color = options?.color;
    this._positions = options?.positions;

    this._indexBufferArr = new Uint32Array(
      options?.positions.map((i, index) => index)
    );
    this._vertexBufferArr = this.getModelCoor().flat();
    console.log(this._vertexBufferArr);
  }

  update = (frameState: any) => {
    if (this.pointCommand) {
      frameState.commandList.push(this.pointCommand);
      this._viewer.scene.requestRender();
    } else {
      this.getPointCommand(frameState.context);
    }
  };

  // 模型局部坐标->世界坐标 转换矩阵(以第一个点为原点)
  getModelMatrix() {
    const initPos = this._positions[0];
    // return Cesium.Transforms.eastNorthUpToFixedFrame(initPos);
    // return Cesium.Matrix4.multiplyByTranslation(
    //   Cesium.Transforms.northEastDownToFixedFrame(initPos),
    //   new Cesium.Cartesian3(0, 0, 0.0), //要转换的笛卡尔坐标
    //   new Cesium.Matrix4() //返回新的矩阵
    // );

    return Cesium.Matrix4.multiplyByTranslation(
      new Cesium.Cartesian3(0, 0, 0.0), //要转换的笛卡尔坐标
      new Cesium.Cartesian3(0, 0, 0.0), //要转换的笛卡尔坐标
      new Cesium.Matrix4() //返回新的矩阵
    );

    // const position = initPos;
    const heading = Cesium.Math.toRadians(0);
    const pitch = Cesium.Math.toRadians(0);
    const roll = Cesium.Math.toRadians(0);
    const headingPitchRoll = new Cesium.HeadingPitchRoll(heading, pitch, roll);

    return Cesium.Transforms.headingPitchRollToFixedFrame(
      this._positions[this._positions.length - 1],
      headingPitchRoll,
      Cesium.Ellipsoid.WGS84,
      Cesium.Transforms.eastNorthUpToFixedFrame,
      new Cesium.Matrix4()
    );
  }

  // 笛卡尔坐标转->局部坐标
  getModelCoor() {
    const initPos = this._positions[0];
    const list = this._positions.map((item, index) => {
      if (index === 0) return [0, 0, 0];
      return [item.x - initPos.x, item.y - initPos.y, item.z - initPos.z];
    });
    return list;
  }

  getPointCommand = (context: any) => {
    const shaderProgram = Cesium.ShaderProgram.fromCache({
      context,
      vertexShaderSource: lineVertexShader(),
      fragmentShaderSource: fragmentShader(this._color),
    });
    const renderState = Cesium.RenderState.fromCache({
      depthTest: { enabled: false },
      depthMask: false,
      blending: Cesium.BlendingState.ALPHA_BLEND,
    });

    const indexBuffer = Cesium.Buffer.createIndexBuffer({
      context,
      // typedArray: new Uint32Array([0, 1, 2]),
      typedArray: this._indexBufferArr,
      usage: Cesium.BufferUsage.STATIC_DRAW,
      indexDatatype: Cesium.IndexDatatype.UNSIGNED_INT,
    });
    const vertexBuffer = Cesium.Buffer.createVertexBuffer({
      context,
      typedArray: Cesium.ComponentDatatype.createTypedArray(
        Cesium.ComponentDatatype.FLOAT,
        this._vertexBufferArr
        // [0, 0, 0, 100, 100, 100, 200, 200, 200]
      ),
      usage: Cesium.BufferUsage.STATIC_DRAW,
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
        this._positions[0],
        50000000 //球的半径
      ),
      primitiveType: Cesium.PrimitiveType.LINE_LOOP,
      shaderProgram,
      renderState,
      vertexArray,
      pass: Cesium.Pass.OPAQUE,
      modelMatrix: this.getModelMatrix(),
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
