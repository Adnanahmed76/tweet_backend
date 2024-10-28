import mongoose from "mongoose";
import tweetModel from "../database/models/tweet.model";
import { ITweetInterface } from "../database/interfaces/tweet.interface";

//get function for api
export const gettweetRepo =async(tweetId:string):Promise<ITweetInterface | null>=>{
    try {
        const tweet=await tweetModel.findOne({tweetId})
        return tweet
    } catch (error) {
        console.log("error in getuserepo", (error as Error).message)
        return null;
    }
}

export const deletetweetRepo =async(tweetId:string):Promise<boolean>=>{
    try {
        const deleted=await tweetModel.findOneAndDelete({uid:tweetId})
        if(deleted){
            return true
        }
        else{
            return false
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}
export const createTweetRepo =async(tweet:ITweetInterface):Promise <Boolean>=>{
    try {
       await tweetModel.create(tweet);
       return true
    } catch (error) {
        console.log(error)
        return false;
    }
}
export const updatedtweetRepo =async(
    tweetId:string,
    updatedtweet:ITweetInterface):Promise <Boolean>=>{
    try {
      const result= await tweetModel.findOneAndUpdate({tweetId},updatedtweet,{
        new:true
      });

      if(result){
        return true
      }
      else{
        return false
      }
    } catch (error:any) {
        console.log("Erro in update TweetRepo",error.message)
        return false;
    }
}
