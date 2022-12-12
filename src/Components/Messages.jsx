import e from "express";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

const URL = "http://localhost:3001/messages";

export default function Messages() {
    const {id} = useParams();

    const [messagesAndTopic, setMessagesAndTopic] = useState();

    const [messagesToAdd, setMessagesToAdd] = useState();  
    function handelMessagesToAddChange(event) {
        setMessagesToAdd(event.target.value);
    }  

    const [messagesToAddError, setMessagesToAddError] = useState('');

    async function getMessages() {
        console.log("Id of topic:");
        console.log(id);

        const response = await fetch(URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idOfTopic: id })
        });
        
        if (response.status === 200) {
            setMessagesAndTopic(await response.json());
        }

        console.log(response);
    }

    function validateMessageToAdd() {
        let currentMessageToAddError = '';

        if (messagesToAdd.length < 1 || (new Blob([messagesToAdd]).size) > 1024) {
            currentMessageToAddError += "Размер текста сообщения либо меньше 1 символа, либо больше 1 КБ! ";
        }

        setMessagesToAddError(currentMessageToAddError);

        if (currentMessageToAddError === '') {
            return true;
        }
        else {
            return false;
        }
    }

    async function handleClickAddMessage() {    
        if (validateMessageToAdd()) {
            const response = await fetch(URL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: messagesToAdd, idOfTopic: id})
            });
            
            if (response.status === 200) {
                console.log(response);
            }

            await getMessages();
        }
    }

    useEffect( () => {        
        getMessages();        
    }, []);

    return <>
        
        {
            messagesAndTopic && <div>{messagesAndTopic[0].title}</div>
        }
        {
            messagesAndTopic && 
            <ul>
                {Array.from(messagesAndTopic).map(message => 
                    <li>
                        <span>{message.login} </span>
                        <span>{new Date(message.dateOfCreation).toJSON().slice(0,10).split('-').reverse().join('.')}:</span>
                        <br/>

                        <span>{message.body} </span>                                                                  
                    </li>)}
            </ul>
        }

        <div>{messagesToAddError}</div>
        <input onChange={handelMessagesToAddChange} />
        <br/>
        <button onClick={handleClickAddMessage}>Ответить</button>
    </>;
}