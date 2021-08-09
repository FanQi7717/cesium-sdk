import React, { memo, useEffect, useRef, useState } from "react";

interface IProps {
  info: string;
}

export default function Init({ info }: IProps) {
  const [data, setData] = useState("welcome!");

  return (
    <>
      <div>
        {data} Init组件。info come from {info}
      </div>
    </>
  );
}
