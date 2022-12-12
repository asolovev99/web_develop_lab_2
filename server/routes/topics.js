const express = require('express');
const topicsRouter = express.Router();
let db = require("../db");

topicsRouter.get("/", async (req, res) => {
    const token = req.cookies.token;
    if (await db.isTokenExist(token)) {
        // Поиск топиков
        let find = req.query.find;
        if (find !== null && find !== undefined) {
            console.log("Request for topics");
            const topics = await db.getTopics(find);

            console.log("find = " + find);
            console.log("Requested topics:");
            console.log(topics);

            res.status(200).json(topics);
        }
        else {
            console.log("Why request GET /topics without find?");
        }
    }
    else {
        res.status(404).json({
            message: "Такого токена нет"
        });
    }
});

topicsRouter.post("/", async (req, res) => {
    const token = req.cookies.token;
    if (await db.isTokenExist(token)) {
        // Добавление темы с первым сообщением
        let title = req.body.title;
        let message = req.body.message;
        if (title !== null && title !== undefined && message !== null && message !== undefined) {
            console.log("Request for adding topic");
            const topicId = await db.addTopicAndMessage(title, Date.now(), req.cookies.token, message);

            res.status(200).json(topicId);
        }
        else {
            console.log("Why request POST /topics title and message?");
        }
    }
    else {
        res.status(404).json({
            message: "Такого токена нет"
        });
    }
});

module.exports = topicsRouter;