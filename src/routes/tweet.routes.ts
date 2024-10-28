import { Router } from "express";
import { createTweetController, deleteTweetController, getTweetController, updateTweetController } from "../controller/tweet.controller";
import { getUserController } from "../controller/user.controller";

const tweetRouter=Router()

//Defile route paths

tweetRouter.get("/:tweetId",getTweetController)
tweetRouter.post("/",createTweetController)
tweetRouter.put("/",updateTweetController)
tweetRouter.delete("/:userId",deleteTweetController)
export default tweetRouter