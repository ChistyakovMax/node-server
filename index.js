import x from "express";

const app = x();
app.get("/", (req, res) => {
    res
    .status(666)
    .set({ "Content-Type": "application/json; charset=utf-8" })
    .json('{"Hello": "world"}');
});

app.all("/login/", (req, res) => {
    try {
        res
        .setHeader("Content-Type", "text/plain; charset=UTF-8")
        .setHeader("Access-Control-Allow-Origin", "*")
        .end("itmo370137");
    } catch (error) {
        console.error("Произошла ошибка:", error);
        res.status(600).send("Произошла ошибка");
    }
});

const func = "function task(x) {\n\treturn x * Math.pow(x,2);\n}";

app.all("/sample/", (req, res) => {
    try {
        res
        .setHeader("Content-Type", "text/plain; charset=UTF-8")
        .setHeader("Access-Control-Allow-Origin", "*")
        .end(func);
    } catch (error) {
        console.error("Произошла ошибка:", error);
        res.status(500).send("Произошла ошибка");
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});