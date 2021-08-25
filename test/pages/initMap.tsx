import React, { memo, useEffect, useRef, useState } from "react";
import { Map } from "../../index";

interface IProps {
  info: string;
}

export default function Init({ info }: IProps) {
  const [data, setData] = useState("welcome!");

  const map = useRef(null);

  useEffect(() => {
    map.current = new Map({ target: "map" });

    return () => {
      map.current?.disposed();
    };
  }, []);

  return (
    <>
      <div>
        {data} Init组件。info come from {info}
      </div>
    </>
  );
}
