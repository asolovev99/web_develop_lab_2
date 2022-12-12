const express = require('express');
const loginRouter = express.Router();
let db = require("../db");

loginRouter.post("/", async (req, res) => {
    console.log("POST /login");
    console.log("login = " + req.body.login);
    console.log("password = " + req.body.password);
    console.log("");

    if (!(await db.isUserExist(req.body.login, req.body.password))) {
        res.status(404).json({
            message: "Такой пользователь не найден"
        });
    }
    else {
        const token = nanoid();

        await db.addToken(token, req.body.login);

        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        let userId = await db.getUser(token);
        res.status(200).json({ userId: userId });
    }
});

loginRouter.delete("/", async (req, res) => {
    console.log("DELETE /login");

    const token = req.cookies.token;

    if (await db.isTokenExist(token)) {
        await db.deleteToken(token);

        res.clearCookie("token");

        res.status(200).json({ok: true});
    }
    else {
        res.status(404).json({
            message: "Такого токена нет"
        });
    }
});

module.exports = loginRouter;