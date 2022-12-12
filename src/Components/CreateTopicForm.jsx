import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";

const URL = 'http://localhost:3001/topics';

export default function CreateTopicForm() {
    const navigate = useNavigate();

    const [titleOfTopic, setTitleOfTopic] = useState('');
    function handelTitleOfTopicChange(event) {
        setTitleOfTopic(event.target.value);
    }

    const [messageOfTopic, setMessageOfTopic] = useState('');
    function handelMessageOfTopicChange(event) {
        setMessageOfTopic(event.target.value);
    }

    
    const [titleAndMesssageError, setTitleAndMesssageError] = useState('');
    const [internetError, setInternetError] = useState('');
    

    function handleClickCancel() {
        navigate("/topics");
    }

    function validateTitleAndMessage() {
        let currentTitleAndMesssageError = '';

        if (titleOfTopic.length < 1 || titleOfTopic.length > 255) {
            currentTitleAndMesssageError += "Размер текста темы либо меньше 1 символа, либо больше 255 символов! ";
        }
        if (messageOfTopic.length < 1 || (new Blob([messageOfTopic]).size) > 1024) {
            currentTitleAndMesssageError += "Размер текста сообщения либо меньше 1 символа, либо больше 1 КБ! ";
        }

        setTitleAndMesssageError(currentTitleAndMesssageError);

        if (currentTitleAndMesssageError === '') {
            return true;
        }
        else {
            return false;
        }
    }

    async function handleClickCreate() {

        setInternetError('');

        if (validateTitleAndMessage()) {
            const response = await fetch(URL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: titleOfTopic, message: messageOfTopic})
            });
            
            if (response.status === 200) {
                console.log(response)
    
                navigate("/topics");
            }
            else {
                setInternetError((await response.json()).message);
            }
        }        
    }

    return <>
        <div>Создать тему</div>        
        <div>{titleAndMesssageError}</div>
        <div>{internetError}</div>

        <span>Тема</span>
        <input value={titleOfTopic} onChange={handelTitleOfTopicChange} />
        <br/>

        <span>Первое сообщение</span>
        <input value={messageOfTopic} onChange={handelMessageOfTopicChange} />
        <br/>

        <button onClick={handleClickCancel}>Отмена</button>
        <button onClick={handleClickCreate}>Создать</button>
    </>
}