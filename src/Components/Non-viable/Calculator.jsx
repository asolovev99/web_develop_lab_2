import {useState} from "react";

const variants = {
    ADD: '+',
    SUBSTRACT: '-',
    DIVIDE: '/',
    MULTIPLY: '*'
};



export default function Calculator() {
    const [value, setValue] = useState('+');
    const [leftValue, setLeftValue] = useState(0);
    const [rightValue, setRightValue] = useState(0);

    function Recalculate() {
        console.log('value:');
        console.log(value);

        console.log("leftValue:");
        console.log(leftValue);

        console.log("rightValue:");
        console.log(rightValue);

        switch (value) {
            case variants.ADD:
                return(leftValue + rightValue);
            case variants.SUBSTRACT:
                return(leftValue - rightValue);
            case variants.MULTIPLY:
                return(leftValue * rightValue);
            case variants.DIVIDE:
                return(leftValue / rightValue);
        }

        console.log();
        console.log();
    }

    return <>
        <input type='number' defaultValue={0} onChange={e => {
                setLeftValue(Number(e.target.value));
            }
        }/>
        <select onChange={e => {
                setValue(e.target.value);
            }
        }>
            {Object.values(variants).map((variant, index) => (
                <option key={index} value={variant}>
                    {variant}
                </option>
            ))}
        </select>
        <input type='number' defaultValue={0} onChange={e => {
            setRightValue(Number(e.target.value));
        }
        }/>
        ={Recalculate()}
    </>;
}