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

export const initView = {
  destination: {
    x: -2784953.3276149537,
    y: 4892053.690628419,
    z: 3185276.127536274,
  },
  orientation: {
    heading: 6.2468124952683795,
    roll: 0,
    pitch: -1.5665013172694056,
  },
};
