const express = require("express");
const Posts = require("../schemas/post")
const router = express.Router();
const moment = require("moment");


router.get("/", (req, res) => {
    res.send("this is root page")
});

//목록 조회 API =>next?
router.get("/posts", async (req, res) => {
    const { createdAt } = req.query
    
    const posts = await Posts.find({ createdAt }).sort('-createdAt')

    res.json({posts})
});

//목록 상세 조회 API
router.get("/posts/:postId", async (req, res) => {
    const { postId } =  req.params;

    // const mysort = {createdAt: -1}//내림차순 어떡하냐구우

    const [ posts ] = await Posts.find({ postId: Number(postId) });//find메소드 검색해보기

    res.json({ posts })
});

//게시글 생성 API
router.post("/posts", async(req, res) => {
    const { postId, user, password, title, posting } = req.body;

    const createdPost = await Posts.create({ 
        postId, user, password, title, posting, 
        createdAt : moment().format("YYYY-MM-DD HH:mm:ss")
    });

    res.json({ posts: createdPost })
});

//게시글 수정 => 비밀번호 체크만 넣으면 ok
router.put("/posts/:postId", async(req, res) => {
    const { postId } = req.params;    
    const { title } = req.body;
    const { posting } = req.body;    

    const posts = await Posts.find({ postId : Number( postId ) });
    // if(posts.password !== password) {
    //     return res.status(400).json({success: false, errorMessage: "비밀번호 불일치!"})
    // } else {
        await Posts.updateOne({ postsId: Number(postId) }, {$set: { title, posting }})  
    // }

    res.json({ success: true })
});


//게시글 삭제 => 비밀번호 체크만 넣으면 ok
router.delete("/posts/:postId", async (req, res) => {
    const { postId } = req.params //파라미터로 담아오는 모든 값은 문자열 

    const existsPost = await Posts.find({ postId : Number(postId)});
    if(existsPost.length) {
        await Posts.deleteOne({ postId: Number(postId) });
    }

    res.json({ success: true })
});


//Router를 app.js에서 사용하기 위해 내보내주는 코드
module.exports = router;