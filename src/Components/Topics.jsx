import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3001/topics";

export default function Topics() {
    const navigate = useNavigate();
    
    const [find, setfind] = useState('');
    function handelFindChange(event) {
        setfind(event.target.value);
    }

    const [topics, setTopics] = useState();

    function handelClickTopic(id) {
        console.log("Переход к топику с id:");
        console.log(id);
        
        navigate("/topics/" + id);
    }

    function topicsToHtml() { 
        console.log("Topics:");        
        console.log(topics);    

        return (
            <>
                {
                topics &&
                <ul>
                    {Array.from(topics).map(topic => 
                    <li key={topic.id}>
                        <span id={topic.id}>
                            <a onClick={() => {let id = topic.id; handelClickTopic(id);}} href="#">{topic.title}</a>
                            <br/>
                            <span>{topic.login} </span>
                            <span>{ new Date(topic.dateOfCreation).toJSON().slice(0,10).split('-').reverse().join('.') } </span>                        
                        </span>
                    </li>)}
                </ul>
                }
            </>
        );
    }

    async function handleClickFind() {  
        console.log("Sending request for topics");

        const searchParams = new URLSearchParams(URL);
        
        const response = await fetch(URL.searchParams.append('x', 42), {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        
        if (response.status === 200) {
            setTopics(await response.json());
        }

        console.log("Response:");
        console.log(response);
    }

    function handleClickCreateNewTopic() {
        navigate("/createTopic");
    }

    useEffect( () => {
        async function fetchData() {
            const response = await fetch(URL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ find: find })
            });
            
            if (response.status === 200) {
                setTopics(await response.json());
            } 
        }
        fetchData();        
    }, []);


    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const URL = "https://jsonplaceholder.typicode.com/todos/";
    async function handleClick(){
        const response = await fetch(URL);
        setTitle((await response.json()).title);
    }
}

    return <>
        <input onChange={setId(parseInt(value))}/>
        <button onClick={handleClick}>получить</button>
        <div>{title}<div/>

        <div>Форум</div>
        <br/>

        <input placeholder="Искать" onChange={handelFindChange} />
        <button onClick={handleClickFind}>🔎</button>
        <br/>
        <button onClick={handleClickCreateNewTopic}>Создать новую тему</button>
        {topicsToHtml()}
    </div>;
}