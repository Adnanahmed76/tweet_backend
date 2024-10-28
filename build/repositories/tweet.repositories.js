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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedtweetRepo = exports.createTweetRepo = exports.deletetweetRepo = exports.gettweetRepo = void 0;
const tweet_model_1 = __importDefault(require("../database/models/tweet.model"));
//get function for api
const gettweetRepo = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweet = yield tweet_model_1.default.findOne({ tweetId });
        return tweet;
    }
    catch (error) {
        console.log("error in getuserepo", error.message);
        return null;
    }
});
exports.gettweetRepo = gettweetRepo;
const deletetweetRepo = (tweetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield tweet_model_1.default.findOneAndDelete({ uid: tweetId });
        if (deleted) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.deletetweetRepo = deletetweetRepo;
const createTweetRepo = (tweet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tweet_model_1.default.create(tweet);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.createTweetRepo = createTweetRepo;
const updatedtweetRepo = (tweetId, updatedtweet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tweet_model_1.default.findOneAndUpdate({ tweetId }, updatedtweet, {
            new: true
        });
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("Erro in update TweetRepo", error.message);
        return false;
    }
});
exports.updatedtweetRepo = updatedtweetRepo;
