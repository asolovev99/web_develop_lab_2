import './App.css';
import React, { useState, createContext } from "react";
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

function App() {
    const [userIdContext, setUserIdContext] = useState(-1);

    return <>
        <Router>
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
        </Router>

    </>;

}

export default App;
