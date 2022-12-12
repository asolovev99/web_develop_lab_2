import React, {useState} from "react";

export default function Request( ) {
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const URL = "https://jsonplaceholder.typicode.com/todos/";
    async function handleClick(){
        const response = await fetch(URL + id);
        setTitle((await response.json()).title);
    }


    return <>
            <input onChange={setId(parseInt(value))}/>
            <button onClick={handleClick}>получить</button>
            <span>{title}</span>
        </>;
}