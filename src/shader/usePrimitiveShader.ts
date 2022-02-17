import { Color } from "@hangkan/hkcim";

export function lineVertexShader() {
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

export function fragmentShader(color: Color) {
  const vec = `vec4(${color.red},${color.green},${color.blue},${color.alpha})`;
  return `
    void main(){
        gl_FragColor = ${vec};
    }
  `;
}
