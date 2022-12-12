import './App.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RegistrationForm from "./Components/RegistrationForm";
import LoginForm from "./Components/LoginForm";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from 'react-router-dom';
import HomeForm from "./Components/HomeForm";
import GetUserInfo from "./Components/Non-viable/GetUserInfo";
import Topics from "./Components/Topics";
import Messages from "./Components/Messages";
import CreateTopicForm from './Components/CreateTopicForm';

import {UserIdContext} from "./Components/UserIdContext";

import './Components/Styles/global.css';

const URLGetUserId = 'http://localhost:3001/user';
const URLDeleteUserCookie = 'http://localhost:3001/login';

function App() {
    const navigate = useNavigate();
    const [userIdContext, setUserIdContext] = useState(-1);

    async function getUserId() {
        console.log("Sending request for userId using cookie");

        const response = await fetch(URLGetUserId, {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        
        if (response.status === 200) {
            console.log("User is logged already");

            setUserIdContext((await response.json()).userId);
        }
        else if (response.status === 401) {
            console.log("User isn't logged yet");

            setUserIdContext(-1);
        } 
    } 

    async function handleClickLogOut() {
        console.log("Sending request to delete token");

        const response = await fetch(URLDeleteUserCookie, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
        
        if (response.status === 200) {
            setUserIdContext(-1);
            navigate("/");
        }
    }

    useEffect( () => {        
        getUserId();        
    }, []);

    return <>
        
            <ul>
                <li>
                    <Link to="/">Домашняя страница</Link>
                </li>
                {
                    userIdContext === -1 &&
                    <li>
                     <Link to="/registration">Регистрация</Link>
                    </li>
                }
                {
                    userIdContext === -1 &&
                    <li>
                      <Link to="/login">Логин</Link>
                    </li>
                }

                {
                    userIdContext !== -1 &&
                    <li>
                        <Link to="/topics">Темы</Link>
                    </li>
                }
            </ul>
            {userIdContext !== -1 && <button onClick={handleClickLogOut}>Разлогиниться</button>}
            <br/>
            
            <span className=''>
                <UserIdContext.Provider value={[userIdContext, setUserIdContext]}>
                    <Routes>
                        <Route path='/registration' element={<RegistrationForm />} />
                        <Route path='/login' element={<LoginForm/>} />
                        <Route path='/' element={<HomeForm/>} />

                        <Route path='/topics' element={<Topics/>}/>
                        <Route path='/createTopic' element={<CreateTopicForm/>}/>
                        <Route path='/topics/:id' element={<Messages/>}/>
                    </Routes>
                </UserIdContext.Provider>
            </span>

    </>;

}

export default App;
