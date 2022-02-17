import React from "react";
import { Link } from "react-router-dom";

export default function Page() {
  return (
    <div
      style={{
        width: 200,
        margin: "20px 40px",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    >
      <div>
        <Link to="usePrimitive"> usePrimitive</Link>
      </div>
      <div>
        <Link to="initMap">initMap</Link>
      </div>
    </div>
  );
}
