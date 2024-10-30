const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
    res.send("hello from server");
});

app.use("/", (req, res) => {
    res.send("hello world");
});

app.listen(7777, () => {
    console.log("server is running");
});
