const express = require("express");
const Posts = require("../schemas/post");
const Comments = require("../schemas/comment");
const router = express.Router();


const comments = [
    {
    "postId": 1,
    "commentId": 1,
    "nickName": "^^ㅎ",
    "commentPosting": "좋은 날이에요~",
    "commentCreatedAt": "2022-07-24T09:38:05.044Z"
    },
    {
        "postId": 1,
        "commentId": 2,
        "nickName": "gogo",
        "commentPosting": "let's go",
        "commentCreatedAt": "2022-07-23T09:38:05.044Z"
        },
    {
    "postId": 2,
    "commentId": 2,
    "nickName": "호랑이",
    "commentPosting": "검은호랑이다~",
    "commentCreatedAt": "2022-07-23T07:42:06.044Z"
    },
    {
    "postId": 3,
    "commentId": 3,
    "nickName": "사자",
    "commentPosting": "그럼 난 사자!",
    "commentCreatedAt": "2022-07-23T08:02:04.044Z"
    },
    {
    "postId": 4,
    "commentId": 4,
    "nickName": "동물원",
    "commentPosting": "내가 사육사",
    "commentCreatedAt": "2022-07-24T02:03:01.044Z"
    },
    {
    "postId": 5,
    "commentId": 5,
    "nickName": "신동엽",
    "commentPosting": "난 동물농장 아저씨~",
    "commentCreatedAt": "2022-07-25T04:28:05.044Z"
    }
]

//게시글 안 댓글 상세 조회(다시고민!)
// router.get("/comments/:postId", async (req, res) => {
//     const { postId } =  req.params
// //find 안에 postId와 commentsId를 둘다넣어야 인식이 가능하려나,,
//     const [ comments ] = await Comments.find({ postId: Number(postId), commentId: Number(commentId) });

//     res.json({ comments })
// });

//댓글 목록 상세 조회
router.get("/comments/:postId", async (req, res) => {
    const { commentId } =  req.params;

    // const comments = await Comments.find();

    const comments = await Comments.find({ commentId: Number(commentId)});

    res.json({ comments })
})

//댓글 생성 API => 여기 잘 모르겟구만ㅠ
router.post("/comments/:postId", async(req, res) => {
    const { postId, commentId, nickName, commentPosting, commentCreatedAt } = req.body;

    const comments = await Comments.find({ commentId })//commentId가 맞나..?

    if(!comments.commentPosting){
        return res
        .status(400)
        .json({ success: false, errorMessage: "댓글 내용을 입력해주세요." })
    }

    const createdComments = await Comments.create({ postId, commentId, nickName, commentPosting, commentCreatedAt });

    res.json({ comments : createdComments })
});




module.exports = router;