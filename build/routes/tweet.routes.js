"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweet_controller_1 = require("../controller/tweet.controller");
const tweetRouter = (0, express_1.Router)();
//Defile route paths
tweetRouter.get("/:tweetId", tweet_controller_1.getTweetController);
tweetRouter.post("/", tweet_controller_1.createTweetController);
tweetRouter.put("/", tweet_controller_1.updateTweetController);
tweetRouter.delete("/:userId", tweet_controller_1.deleteTweetController);
exports.default = tweetRouter;
