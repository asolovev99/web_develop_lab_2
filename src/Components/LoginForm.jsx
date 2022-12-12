import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";

import {UserIdContext} from "./UserIdContext";

const URL = 'http://localhost:3001/login';

export default function LoginForm() {
    const [userIdContext, setUserIdContextContext] = useContext(UserIdContext);    

    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [login, setLogin] = useState('');
    function handelLoginChange(event) {
        setLogin(event.target.value);
    }
    const [password, setPassword] = useState('');
    function handelPasswordChange(event) {
        setPassword(event.target.value);
    }

    const navigate = useNavigate();

    function validateLoginAndPassword() {
        let currentLoginError = '';
        let currentPasswordError = '';

        if (login.length < 6 || login.length > 20)
        {
            currentLoginError += 'Поле "Логин" должно содержать от 6 до 20 символов! ';
        }

        for (let i = 0; i < login.length; i++) {
            if (!((login[i] >= '0' && login[i] <= '9') || (login[i] >= 'a' && login[i] <= 'z') || (login[i] >= 'A' && login[i] <= 'Z'))) {
                currentLoginError += 'Поле "Логин" может содержать только буквы латинского алфавита и цифры! ';

                break;
            }
        }

        if (password.length < 1)
        {
            currentPasswordError += "Поле \"Пароль\" не может быть пустым! ";
        }

        setLoginError(currentLoginError);
        setPasswordError(currentPasswordError);
    }

    async function handleClickSubmit() {
        validateLoginAndPassword();

        if (loginError === '' && passwordError === '') {
            console.log("Sending request to log in");

            const dataLogIn = {
                login: login,
                password: password
            }

            const response = await fetch(URL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataLogIn)
            });
            
            if (response.status === 200) {
                setUserIdContextContext((await response.json()).userId);

                navigate("/topics");
            }

            console.log("response:");
            console.log(response)
            console.log("userIdContext:");
            console.log(userIdContext);
        }
    }


    return <>
        Логин:
        <input value={login} onChange={handelLoginChange} />
        <br/>
        <div>{loginError}</div>

        Пароль:
        <input type="password" value={password} onChange={handelPasswordChange} />
        <br/>
        <div>{passwordError}</div>

        <button onClick={handleClickSubmit}>Войти</button>
        <br/>
    </>;
}