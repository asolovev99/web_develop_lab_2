import React, {useState} from "react";

export default function Validation() {
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordRepeatError, setPasswordRepeatError] = useState('');

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
    function handleClickSubmit() {
        let currentLoginError = '';
        let currentPasswordError = '';
        let currentPasswordRepeatError = '';

        if (login.length < 6 || login.length > 20)
        {
            currentLoginError += 'Поле \"Логин\" должно содержать от 6 до 20 символов! ';
        }

        for (let i = 0; i < login.length; i++) {
            if (!((login[i] >= '0' && login[i] <= '9') || (login[i] >= 'a' && login[i] <= 'z') || (login[i] >= 'A' && login[i] <= 'Z'))) {
                currentLoginError += 'Поле \"Логин\" может содержать только буквы латинского алфавита и цифры! ';

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
        if (passwordRepeat.localeCompare(password) !== 0) {
            currentPasswordRepeatError += "Поле \"Повтор пароля\" не совпадает с полем! \"Пароль\"";
        }


        setLoginError(currentLoginError);
        setPasswordError(currentPasswordError);
        setPasswordRepeatError(currentPasswordRepeatError)
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
            <div>{passwordRepeatError}</div>

            <button onClick={handleClickSubmit}>Войти</button>

        </>;
}