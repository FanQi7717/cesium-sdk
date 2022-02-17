import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Map } from "../../../index";
import { UsePrimitive } from "../../../src/UsePrimitive";
import { getGeoserverUrl, geoserver } from "../../config/const";

interface IProps {}

export default function Init({}: IProps) {
  useEffect(() => {
    window.map = new Map({ target: "map" });

    getGeoJson();

    return () => {
      window.map?.viewer && window.map?.viewer.disposed();
    };
  }, []);

  const getGeoJson = useCallback(async () => {
    const url = `${geoserver}${getGeoserverUrl({
      typeName: "testdb:region",
      maxFeatures: 1,
    })}`;
    const json = await fetch(url).then((res) => res.json());

    const { features } = json;
    console.log(json);
    features.forEach((f) => {
      const { coordinates } = f.geometry;
      console.log(
        coordinates[0].map((i) => Cesium.Cartesian3.fromDegrees(i[0], i[1], 0))
      );
      const primitive = new UsePrimitive({
        primitiveType: f.geometry.type, //polygon
        viewer: window.map.viewer,
        color: Cesium.Color.RED,
        // positions: coordinates[0].map((i) => Cesium.Cartesian3.fromDegrees(i)),
      });
    });
  }, []);

  return <></>;
}
