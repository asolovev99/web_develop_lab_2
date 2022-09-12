import './App.css';
import {useState} from "react";


function App() {
  let [value, setValue] = useState(1);

  const clickHandlerPlus = () => {
    setValue(value + 1);
  }
  const clickHandlerMinus = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  }

  return <>
    <button onClick={clickHandlerPlus}>+</button>
      {value}
    <button onClick={clickHandlerMinus}>-</button>
    </>
  ;
}

export default App;
