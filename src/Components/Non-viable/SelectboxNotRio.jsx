import {useState} from "react";

const variants = ['Воронеж', 'Рио-де-Жанейро'];

export default function SelectboxNotRio() {
    const [value, setValue] = useState(false);

    function handleChangeTown(event) {
        if (variants[event.target.value] === 'Рио-де-Жанейро') {
            setValue(true)
        }
        else {
            setValue(false)
        }
    }

    return <>
        {value ? 'Это Рио-де-Жанейро!' : 'Нет, это не Рио-де-Жанейро!'}
        <br/>
        <select onChange={handleChangeTown}>
            {variants.map((variant, index) => (
                <option key={index} value={index}>
                    {variant}
                </option>
            ))}
        </select>
        </>
}