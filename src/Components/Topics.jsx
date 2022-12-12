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
        console.log(id);
        console.log("/topics/" + id);
        navigate("/topics/" + id);
    }

    function topicsToHtml() {     
        console.log(topics);    

        return (
            <>
                {
                topics &&
                <ul>
                    {Array.from(topics).map(topic => 
                    <li key={topic.id}>
                        <span id={topic.id} onClick={() => {let id = topic.id; handelClickTopic(id);}}>     
                            <span>{topic.title}</span>
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

    return <>
        <div>Форум</div>
        <br/>

        <input placeholder="Искать" onChange={handelFindChange} />
        <button onClick={handleClickFind}>🔎</button>
        <br/>
        <button onClick={handleClickCreateNewTopic}>Создать новую тему</button>
        {topicsToHtml()}
    </>;
}