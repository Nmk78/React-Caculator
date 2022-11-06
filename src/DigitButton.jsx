import { OPERATION_TYPE } from "./App";

export default function DigitButton({ dispatch, digit }) {
  return (
    <button className="btnCells"
      onClick={() => dispatch({ operationType : OPERATION_TYPE.Add_Digit, payload: { digit } })
      }
    >
      {digit}
    </button>
  );
}

