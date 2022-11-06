import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperatioButton from "./OperatioButton";
import "./index.css";
import "./style.css";

export const OPERATION_TYPE = {
  Add_Digit: "addingDigits",
  ADD_Decimal: "addingDecimal",
  ADD_Del: "addDelete",
  ADD_AC: "addAllClear",
  ADD_Operation: "addOperation",
  COMPUTE: "compute",
};



let reducerFn = (state, { operationType, payload }) => {
  switch (operationType) {
       
    case OPERATION_TYPE.COMPUTE:
      if (state.currDigits === null && state.prevDigits === !null){
        return{
          ...state,
          prevDigits : state.prevDigits,
          currDigits : state.currDigits,
          operators : state.operators
        }
      }

      if (state.operators === null ||
          state.currDigits === null ||
          state.prevDigits === null
        ) {
        return state;
      }
         return{
          ...state,
          operators : null,
          prevDigits : null,
          currDigits : computeFn(state),
          overWrite : true,

         }

    case OPERATION_TYPE.Add_Digit:

         if (state.overWrite) {
          return {
            ...state,
            prevDigits : null,
            currDigits : payload.digit
          }
         }
        

        if (payload.digit === "0" && state.currDigits === "0") {
          return state
        }  

        if (payload.digit === "." && state.currDigits?.includes('.')) {
          return{ currDigits : null}
        }
        if (state.currDigits === null || state.prevDigits ) {
          return {
            ...state,
            currDigits :`${state.currDigits || ""}${payload.digit}`
          }
        }
        if (!payload.digit) {
          return state
        }
         return {
          ...state,
          currDigits: `${state.currDigits || ""}${payload.digit}`,
        }
      
    case OPERATION_TYPE.ADD_Operation:
    
        if (state.currDigits === null && state.prevDigits === null) {
          return state
        }

        if (state.currDigits === null) {
          return {
            ...state,
            operators : payload.operator
          }
        }
        if (state.prevDigits == null) {
          return {
            ...state,
            operators: payload.operatorer,
            prevDigits: state.currDigits,
            currDigits: null,
          };
        }
  
        return {
          ...state,
          previousOperand: computeFn(state),
          operation: payload.operation,
          currentOperand: null,
        };
    
    case OPERATION_TYPE.ADD_AC:
      return {};

    case OPERATION_TYPE.ADD_Del:
      if ( state.overWrite){
        return{
          ...state,
          currDigits : null,
        }
      }
      if(state.currDigits === null) return state
      if(state.prevDigits === null) return state
      if (state.currDigits?.length === 1){
        return{
          ...state,
          currDigits : null,
        }
      }
      return{
        currDigits : state.currDigits?.slice(0,-1)
      }
  }
}; //ReducerFn Ended


// let computeFn = ({currDigits, prevDigits, operators}) => {
//   let current = parseFloat(currDigits);
//   let previous = parseFloat(prevDigits);
//   if (isNaN(current) || isNaN(previous)) return console.log("Failed"); ;
  
//   let RESULT = ""

//     switch (operators) {
//       case "+":
//         RESULT = previous + current;
//         break;
//       case "-":
//         RESULT = previous + current;
//         break;
//       case "x":
//         RESULT = previous + current;
//         break;
//       case "÷":
//         RESULT = previous + current;
        
//       return  console.log(RESULT);

//     }
// };

function computeFn({ currDigits, prevDigits, operators }) {
  const prev = parseFloat(prevDigits);
  const current = parseFloat(currDigits);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operators) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}


function App() {
  const [{ prevDigits, currDigits, operators }, dispatch] = useReducer(
    reducerFn,
    {}
  );

    // dispatch({ operationType: OPERATION_TYPE.Add_Digit, payload: { digit: 1 } });

  return (
    <>
      <div className="output">
        <div className="prevOutput">
          {prevDigits} {operators}
        </div>
        <div className="currentOutput">{currDigits}</div>
      </div>

      <div className="btnContainer">
        <button
          className="btnXL"
          onClick={() => dispatch({ operationType : OPERATION_TYPE.ADD_AC })}
        >
          AC
        </button>
        <button onClick={() => dispatch({ operationType: OPERATION_TYPE.ADD_Del})} className="btnCells">
        DEL
        </button>
        <OperatioButton operator="÷" dispatch={dispatch} />

        <DigitButton digit="1" dispatch={dispatch} />

        <DigitButton digit="2" dispatch={dispatch} />

        <DigitButton digit="3" dispatch={dispatch} />

        <OperatioButton operator="x" dispatch={dispatch} />

        <DigitButton digit="4" dispatch={dispatch} />

        <DigitButton digit="5" dispatch={dispatch} />

        <DigitButton digit="6" dispatch={dispatch} />

        <OperatioButton operator="+" dispatch={dispatch} />

        <DigitButton digit="7" dispatch={dispatch} />

        <DigitButton digit="8" dispatch={dispatch} />

        <DigitButton digit="9" dispatch={dispatch} />

        <OperatioButton operator="-" dispatch={dispatch} />

        <DigitButton digit="." dispatch={dispatch} />

        <DigitButton digit="0" dispatch={dispatch} />

        <button
          className="btnXL"
          onClick={() => dispatch({ operationType: OPERATION_TYPE.COMPUTE })}
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;
