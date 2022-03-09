import { Color } from "@hangkan/hkcim";

export function lineVertexShader() {
  //   return `
  //     attribute vec3 position3DHigh;
  //     attribute vec3 position3DLow;

  //     void main(){
  //         vec4 p = czm_translateRelativeToEye(position3DHigh, position3DLow);
  //         p = czm_modelViewProjectionRelativeToEye * p;
  //         gl_Position = p;
  //     }
  // `;
  return `
    attribute vec3 position3DHigh;
    attribute vec3 position3DLow;
    attribute vec3 normal;
    attribute vec2 st;
    attribute float batchId;

    varying vec3 v_positionEC;
    varying vec3 v_normalEC;
    varying vec2 v_st;

    void main()
    {
      vec4 p = czm_translateRelativeToEye(position3DHigh, position3DLow);

      v_positionEC = (czm_modelViewRelativeToEye * p).xyz;      // position in eye coordinates
      v_normalEC = czm_normal * normal;                         // normal in eye coordinates
      v_st = st;

      // vec4 positionMC = czm_inverseModelView * vec4(v_positionEC, 1.0);
      // vec4 positionMC_new = vec4(positionMC.xy, positionMC.z + czm_frameNumber * 100.0, 1.0); // z轴向上平移动画
      // vec4 resultPosition = czm_modelViewInfiniteProjection * positionMC_new; // 一步直接算到 gl_Position 所需的坐标
      // gl_Position = resultPosition;

      gl_Position = czm_modelViewProjectionRelativeToEye * p;
    }
`;
}

export function fragmentShader(color: Color) {
  const vec = `vec4(${color.red},${color.green},${color.blue},${color.alpha})`;
  return `
    void main(){
        gl_FragColor = ${vec};
    }
  `;
}

export function getDefaultVShader() {
  return `
    attribute vec3 position3DHigh;
    attribute vec3 position3DLow;

    void main(){
        vec4 p = czm_translateRelativeToEye(position3DHigh, position3DLow);
        p = czm_modelViewProjectionRelativeToEye * p;
        gl_Position = p;
    }
  `;
}

export function getDefaultFShader(
  color: any = { red: 0.5, green: 0.5, blue: 0.5, alpha: 0.5 }
) {
  const vec = `vec4(${color.red},${color.green},${color.blue},${color.alpha})`;
  return `
    void main() {
      gl_FragColor = ${vec};
    }
  `;
}
