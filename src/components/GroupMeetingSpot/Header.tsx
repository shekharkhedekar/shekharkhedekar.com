import React from "react";
import { boxShadow } from "./constants";

export const Header = () => {
  return (
    <div
      style={{
        boxShadow,
        zIndex: 1,
        background: "white",
        padding: "0.25rem 1rem",
        position: "relative",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h1 style={{ fontSize: "1.25rem" }}>Find a Meeting Spot!</h1>
    </div>
  );
};
