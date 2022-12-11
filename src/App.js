import './App.css';
import React from "react";
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

function App() {
    return <>
        <Router>
            <ul>
                <li>
                    <Link to="/">Домашняя страница</Link>
                </li>
                <li>
                    <Link to="/registration">Регистрация</Link>
                </li>
                <li>
                    <Link to="/login">Логин</Link>
                </li>
            </ul>

            <Routes>
                <Route path='/registration' element={<RegistrationForm />} />
                <Route path='/login' element={<LoginForm/>} />
                <Route path='/' element={<HomeForm/>} />

                <Route path='/topics' element={<Topics/>}/>
                <Route path='/topics/:id' element={<Messages/>}/>
            </Routes>
        </Router>

    </>;

}

export default App;
