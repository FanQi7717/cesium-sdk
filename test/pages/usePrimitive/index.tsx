import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Map } from "../../../index";
import { UsePrimitive } from "../../../src/UsePrimitive";
import { getGeoserverUrl, geoserver } from "../../config/const";

interface IProps {}

export default function Init({}: IProps) {
  const map = useRef(null);

  useEffect(() => {
    map.current = new Map({ target: "map" });
    window.map = map.current;

    map.current.viewer.scene.camera.setView({
      destination: {
        x: -2754442.585868227,
        y: 4774282.753330838,
        z: 3220186.9274789356,
      },
      orientation: {
        heading: 6.2468124952683795, //方位角，与正北夹角弧度
        roll: 0, //滚动角
        pitch: -1.5665013172694056, //俯仰角
      },
    });

    const url = `${geoserver}${getGeoserverUrl({
      typeName: "testdb:region",
      maxFeatures: 1,
    })}`;

    setTimeout(() => {
      getByEntity(url);
    }, 1000);

    getGeoJson(url);

    return () => {
      map.current?.viewer && map.current?.viewer.disposed();
    };
  }, []);

  const getGeoJson = useCallback(async (url) => {
    const json = await fetch(url).then((res) => res.json());

    const { features } = json;
    features.forEach((f) => {
      const { coordinates } = f.geometry;
      const primitive = new UsePrimitive({
        primitiveType: f.geometry.type, //polygon
        viewer: map.current.viewer,
        color: Cesium.Color.RED,
        positions: coordinates[0].map((i) =>
          Cesium.Cartesian3.fromDegrees(i[0], i[1], 0)
        ),
      });
      map.current.viewer.scene.primitives.add(primitive);
    });
  }, []);

  const getByEntity = useCallback(async (url) => {
    const json = await fetch(url).then((res) => res.json());
    const layer = await map.current.viewer.dataSources.add(
      Cesium.GeoJsonDataSource.load(json)
    );
    layer.name = "polygon_行政区划";
    const entities = layer.entities.values;
    console.log(entities, 999);
    entities.forEach((entity) => {
      if (entity.polygon) {
        entity.polygon.height = 50;
        // entity.polygon.extrudedHeight = 5;
        entity.polygon.outline = false;
        entity.polygon.material = Cesium.Color.WHITE;
      }
    });
  }, []);

  return <></>;
}
