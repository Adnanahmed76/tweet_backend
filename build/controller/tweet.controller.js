"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTweetController = exports.updateTweetController = exports.createTweetController = exports.getTweetController = void 0;
const user_repositories_1 = require("../repositories/user.repositories");
const tweet_repositories_1 = require("../repositories/tweet.repositories");
const user_repositories_2 = require("../repositories/user.repositories");
const getTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    console.log("fetching tweet with id:", tweetId);
    try {
        const tweet = yield (0, user_repositories_1.getUserRepo)(tweetId);
        console.log("Fetched tweet:", tweet);
        if (tweet) {
            res.status(200).json({ "data": tweet });
        }
        else {
            res.status(500).json({ "error": "Found tweet not found" });
        }
    }
    catch (error) {
        console.log("Error in getTweetController:", error);
    }
});
exports.getTweetController = getTweetController;
const createTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = req.body;
    try {
        console.log("Creating tweet:", tweet);
        const success = yield (0, tweet_repositories_1.createTweetRepo)(tweet);
        if (success) {
            console.log("Tweet created successfully:", tweet);
            const userUpdateSuccess = yield (0, user_repositories_2.updateUserWithTweetIdRepo)(tweet.adminId, tweet.tweetId);
            if (userUpdateSuccess) {
                res.status(200).json({ "data": tweet });
            }
            else {
                console.log("Failed to update user with tweetId:", tweet.tweetId);
                res.status(500).json({ "error": "User Not updated" });
            }
        }
        else {
            console.log("Tweet creation failed.");
            res.status(500).json({ "error": "tweet Not Created" });
        }
    }
    catch (error) {
        console.log("Error in createTweetController:", error);
        res.status(500).json({ "error": error });
    }
});
exports.createTweetController = createTweetController;
const updateTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTweet = req.body;
    console.log("Received update request for tweet:", updatedTweet);
    try {
        const success = yield (0, tweet_repositories_1.updatedtweetRepo)(updatedTweet.tweetId, updatedTweet);
        console.log("Update success status:", success);
        if (success) {
            res.status(200).json({ data: "Tweet Updated" });
        }
        else {
            console.log("Failed to update tweet with tweetId:", updatedTweet.tweetId);
            res.status(500).json({ error: "Tweet Not Updated" });
        }
    }
    catch (error) {
        console.log("Error in updateTweetController:", error);
        res.status(500).json({ error: error });
    }
});
exports.updateTweetController = updateTweetController;
const deleteTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    try {
        const success = yield (0, tweet_repositories_1.deletetweetRepo)(tweetId);
        if (success) {
            res.status(200).json({ "data": "Tweet deleted" });
        }
        else {
            res.status(500).json({ "error": " tweet Not deleted" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ "error": error });
    }
});
exports.deleteTweetController = deleteTweetController;
