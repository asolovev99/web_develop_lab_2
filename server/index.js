const express = require('express');
const cors = require('cors');
const nanoid = require("nanoid");
let cookies = require("cookie-parser");
let db = require("./db")



const app = express();
app.use(express.json());
app.use(cookies());

app.use(
    cors({
        credentials: true, // чтобы работали secured куки
        origin: true // автоматом подставляется текущий сервер в Origin
    })
);

app.get("/", (req, res) => {
    res.status(200).json({ok: true});
});

app.post("/registration", async (req, res) => {
    console.log("POST /registration");
    console.log("login = " + req.body.login);
    console.log("password = " + req.body.password);
    console.log(req.body);
    

    if (await db.addUser(req.body.login, req.body.password) < 0) {
        res.status(400).json({
            message: "Такой пользователь уже есть"
        });
    }
    else {
        res.status(200).json({
            message: "Пользователь успешно добавлен"
        });
    }    
});

app.post("/login", async (req, res) => {
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
            /* sameSite: 'none', */
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        });
    
        res.status(200).json({ok: true});
    }
});

app.delete("/login", async (req, res) => {
    console.log("DELETE /login");
    
    const token = req.cookies.token;
    
    if (await db.isTokenExist(token)) {
        await db.deleteToken(token);

        res.clearCookie(token);  
        
        res.status(200).json({ok: true});   
    }
    else {
        res.status(404).json({
            message: "Такого токена нет"
        });
    }    
});

app.post("/topics", async (req, res) => {
    const token = req.cookies.token;
    if (await db.isTokenExist(token)) {
        // Поиск топика
        if (req.body.find !== null && req.body.find !== undefined) {
            let find = req.body.find;
            const topics = await db.getTopics(find);

            res.status(200).json(topics);
        }        
        // Добавление темы с первым сообщением
        else if (req.body.title !== null && req.body.title !== undefined && req.body.message !== null && req.body.message !== undefined) {
            let titleOfTopic = req.body.title;
            let messageOfTopic = req.body.message;
            const topicId = await db.addTopicAndMessage(titleOfTopic, Date.now(), req.cookies.token, messageOfTopic);
                
            res.status(200).json(topicId);
        }
    }
    else {
        res.status(404).json({
            message: "Такого токена нет"
        });
    }
});

app.post("/messages", async (req, res) => {
    const token = req.cookies.token;
    if (await db.isTokenExist(token)) {
        // Добавление сообщения
        if (req.body.message !== null && req.body.message !== undefined && req.body.idOfTopic !== null && req.body.idOfTopic !== undefined) {
            let idOfTopic = req.body.idOfTopic;
            let message = req.body.message;
            await db.addMessage(message, Date.now(), idOfTopic, token);
                
            res.status(200).json({ok: true});
        }  // Получение сообщений по теме        
        else if (req.body.idOfTopic !== null && req.body.idOfTopic !== undefined) {
            let idOfTopic = req.body.idOfTopic;
            const topic = await db.getTopicAndMessages(idOfTopic);

            res.status(200).json(topic);
        }  
    }
    else {
        res.status(404).json({
            message: "Такого токена нет"
        });
    }
});



const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)    
});

(async () => {
    await db.initDb();
})();