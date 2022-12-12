import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const URL = 'http://localhost:3001/registration';

export default function RegistrationForm() {
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordReapeatError, setPasswordReapeatError] = useState('');

    const [login, setLogin] = useState('');
    function handelLoginChange(event) {
        setLogin(event.target.value);
    }
    const [password, setPassword] = useState('');
    function handelPasswordChange(event) {
        setPassword(event.target.value);
    }
    const [passwordRepeat, setPasswordRepeat] = useState('');
    function handelPasswordRepeatChange(event) {
        setPasswordRepeat(event.target.value);
    }

    const navigate = useNavigate();

    function validateLoginAndPassword() {
        let currentLoginError = '';
        let currentPasswordError = '';
        let currentPasswordRepeatError = '';

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

        if (passwordRepeat.length < 1)
        {
            currentPasswordRepeatError += "Поле \"Повтор пароля\" не может быть пустым! ";
        }
        if (password !== passwordRepeat) {
            currentPasswordRepeatError += "Повтор пароля не совпадает с паролем! ";
        }

        setLoginError(currentLoginError);
        setPasswordError(currentPasswordError);
        setPasswordReapeatError(currentPasswordRepeatError);
    }

    async function handleClickSubmit() {
        validateLoginAndPassword();

        if (loginError === '' && passwordError === '' && passwordReapeatError === '') {
            const dataLogIn = {
                login: login,
                password: password
            }

            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataLogIn)
            });
            
            console.log(response.status)

            if (response.status === 200) {                 
                navigate("/login");
            }
        }
    }


    return <>
        Логин:
        <input value={login} onChange={handelLoginChange} />
        <br/>
        <div>{loginError}</div>

        Пароль:
        <input value={password} onChange={handelPasswordChange} />
        <br/>
        <div>{passwordError}</div>

        Повтор пароля:
        <input value={passwordRepeat} onChange={handelPasswordRepeatChange} />
        <br/>
        <div>{passwordReapeatError}</div>

        <button onClick={handleClickSubmit}>Войти</button>
        <br/>
    </>;
}