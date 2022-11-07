import React, {useState} from "react";

const URL = 'http://localhost:3001/auth';

export default function LoginForm() {
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

    async function handleClickSubmit() {
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

        if (currentLoginError === '' && currentPasswordError === '') {
            const dataLogIn = {
                nickname: login,
                password: password
            }

            const response = await fetch(URL, {
                method: "POST",
                /*headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },*/
                body: JSON.stringify(dataLogIn)
            });

            console.log(response.status)
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

        <button onClick={handleClickSubmit}>Войти</button>
        <br/>
    </>;
}