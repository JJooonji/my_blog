const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

connect();

const postRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments")

//미들웨어
const requestMiddleware = (req, res, next) => {
    console.log("Request URL", req.originalUrl, " - ", new Date());
    next();//
};

//json 미들웨어를 사용해 body로 전달된 데어터를 사용할 수 있게 함.
app.use(express.json());

app.use(requestMiddleware);

//api뒤에 시작되는 주소는 routes/posts.js에 있는 Router 미들웨워를 통해 처리
app.use("/api", [postRouter, commentsRouter]);

//get이라는 http 메소드로 지정 경로로 요청이 들어왔다면 실행이 됨.
app.get("/", (req, res) => {
    res.send("Hello Wolrd")
});

//서버를 해당 포트로 켜겠다는 것(listen)->제대로 켜졌다면 두번째의 함수가 실행됨.
app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요!")
})