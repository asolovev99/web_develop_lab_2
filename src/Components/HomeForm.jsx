import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from 'react-router-dom';

export default function HomeForm() {

    return <>
        <Router>
            <ul>
                <li>
                    <Link to="/registration">Регистрация</Link>
                </li>
                <li>
                    <Link to="/login">Логин</Link>
                </li>
            </ul>

            <Routes>
                <Route path='/registration' element={<RegistrationForm />} />
                <Route path='/login' element={<LoginForm />} />
            </Routes>
        </Router>

        </>;
}