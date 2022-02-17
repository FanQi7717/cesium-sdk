export const geoserver = `http://10.5.1.23:9000/geoserver/testdb/ows?`;

export const baseParams = {
  service: "WFS",
  version: "1.0.0",
  request: "GetFeature",
  //   typeName: "testdb:guihua",
  //   maxFeatures: 5000,
  outputFormat: "application/json",
};

export function getGeoserverUrl(params: {
  typeName: string;
  maxFeatures: number;
}) {
  const obj = { ...params, ...baseParams };
  return Object.keys(obj)
    .map((k) => `${k}=${obj[k]}`)
    .join("&");
}
