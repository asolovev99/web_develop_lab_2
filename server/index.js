const express = require('express');
const cors = require('cors');
const nanoid = require("nanoid");
let cookies = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookies());

app.use(
    cors({
        credentials: true, // чтобы работали secured куки
        origin: true // автоматом подставляется текущий сервер в Origin
    })
);

const users = [
    {
        id: nanoid(),
        login: "123",
        password: "123"
    }
];

const tokens = [
    {
        userId: "123123123123",
        token: "123412341234",
        createdAt: Date()
    }
]

app.get("/", (req, res) => {
    res.status(200).json({ok: true});
});

app.get("/user", (req, res) => {
    console.log(req.cookies);
    const token = req.cookies.token;
    const foundToken = tokens.find(tokenItem => tokenItem.token === token);
    if (!foundToken) {
        res.status(401).json({
            message: "Пользователь не авторизован"
        });
    }

    const user = users.find(user => user.id === foundToken.userId);
    res.status(200).json(user);
});

app.post("/user", (req, res) => {

    if (users.find(user => user.login === req.body.login)) {
        res.status(400).json({
            message: "Такой пользователь уже есть"
        });
    }

    const newUser = {
        id: nanoid(),
        login: req.body.login,
        password: req.body.password,
    };
    users.push(newUser);
    res.status(200).json(newUser);
});

app.post("/auth", (req, res) => {

    const user = users.find(user => user.login === req.body.login);

    if (!user) {
        return res.status(404).json({
            message: "Такой пользователь не найден"
        });
    }

    if (user.password !== req.body.password) {
        return res.status(400).json({
            message: "Пароль неверный"
        });
    }

    const token = nanoid();
    tokens.push({
        userId: user.id,
        token,
        createdAt: Date()
    });
    res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production'
    });

    res.status(200).json({ok: true});
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});