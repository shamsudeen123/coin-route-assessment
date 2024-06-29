import React from "react";

// Custom image component
export default function Image({url}) {
  return (
    <img
      height={30}
      width={30}
      src={url}
    />
  );
}
