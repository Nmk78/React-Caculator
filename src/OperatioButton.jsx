import React from "react";
import { OPERATION_TYPE } from "./App";

export default function OperatioButton({dispatch , operator}) {
  return (
      <button className="btnCells"
        onClick={() =>
          dispatch({ operationType: OPERATION_TYPE.ADD_Operation, payload: {operator} })
        }
      >
        {operator}
      </button>
  );
}
