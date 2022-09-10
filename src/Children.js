import React, { memo } from "react";

const Children=({ onClick, data })=> {
  return (
    <>
      <button onClick={onClick}>HIT API</button>
      <h1>{data}</h1>
    </>
  );
};

export const MemoChildren = memo(Children,(prevProps,nextProps)=>{
  return prevProps.data === nextProps.data
})
