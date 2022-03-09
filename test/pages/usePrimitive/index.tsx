import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Map } from "../../../index";
import { UsePrimitive } from "../../../src/UsePrimitive";
import { getGeoserverUrl, geoserver } from "../../config/const";
import { initView } from "../../config/const";

interface IProps {}

let map = null;

export default function Init({}: IProps) {
  useEffect(() => {
    map = new Map({ target: "map" });
    // window.map = map;
    map.viewer.scene.camera.setView(initView);

    const url = `${geoserver}${getGeoserverUrl({
      typeName: "testdb:region",
      maxFeatures: 50,
    })}`;

    getGeomByEntity(url);
    getGeomByDiyPrimitive(url);

    return () => {
      map?.viewer && map?.viewer.disposed();
    };
  }, []);

  const getGeomByDiyPrimitive = useCallback(async (url) => {
    const json = await fetch(url).then((res) => res.json());
    const { features } = json;
    features.forEach((f) => {
      const { coordinates } = f.geometry;
      const polygonGeom = new Cesium.PolygonGeometry({
        polygonHierarchy: new Cesium.PolygonHierarchy(
          Cesium.Cartesian3.fromDegreesArray(coordinates.flat(4))
        ),
        height: 50,
        extrudedHeight: 100,
        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
      });
      const polygonGeometry =
        Cesium.PolygonGeometry.createGeometry(polygonGeom);

      const primitive = new UsePrimitive({
        viewer: map.viewer,
        geometry: polygonGeometry,
      });
      map.viewer.scene.primitives.add(primitive);
    });
  }, []);

  const getGeomByEntity = useCallback(async (url) => {
    const json = await fetch(url).then((res) => res.json());
    const layer = await map.viewer.dataSources.add(
      Cesium.GeoJsonDataSource.load(json)
    );
    layer.name = "polygon_行政区划";
    const entities = layer.entities.values;
    entities.forEach((entity) => {
      if (entity.polygon) {
        entity.polygon.height = 50;
        entity.polygon.extrudedHeight = 100;
        entity.polygon.outline = false;
        entity.polygon.material = Cesium.Color.WHITE;
      }
    });
  }, []);

  return <></>;
}
