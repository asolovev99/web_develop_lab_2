import './App.css';
import React, {useState} from "react";
import Timer from "./Components/Timer";
import TimerForward from "./Components/TimerForward";
import SelectboxNotRio from "./Components/SelectboxNotRio";
import Calculator from "./Components/Calculator";
import Validation from "./Components/Validation";


function App() {
  /*let [value, setValue] = useState(1);
  let [deltaValue, setDeltaValue] = useState(1);

  const clickHandlerPlus = () => {
    setValue(value + deltaValue);
  }
  const clickHandlerMinus = () => {
    if (value >= deltaValue) {
      setValue(value - deltaValue);
    }
  }*/

  return <>
    {/*<input
      type="range"
      value={deltaValue}
      min={1}
      max={10}
      onChange={e => setDeltaValue(Number(e.target.value))}
    />
    {deltaValue}
    <br/>
    <button onClick={clickHandlerPlus}>+</button>
      {value}
    <button onClick={clickHandlerMinus}>-</button>

      <br/>
      <Timer/>

      <br/>
      <TimerForward/>*/}

      {/*<SelectboxNotRio/>
      <br/>
      <br/>
      <Calculator/>*/}
      <Validation/>
    </>
  ;
}

export default App;
