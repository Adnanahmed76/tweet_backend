import { Request ,Response } from "express";
import { getUserRepo,createUserRepo,deleteUserRepo,updateUserRepo } from "../repositories/user.repositories";
import { IUserInterface } from "../database/interfaces/user.interface";
import { error } from "console";
import { ITweetInterface } from "../database/interfaces/tweet.interface";
import { createTweetRepo, deletetweetRepo, updatedtweetRepo } from "../repositories/tweet.repositories";
import { updateUserWithTweetIdRepo } from "../repositories/user.repositories";



export const getTweetController=async(req: Request,res:Response)=>{
    const tweetId=req.params.tweetId as string;
    console.log("fetching tweet with id:" ,tweetId);
    try {
        const tweet=await getUserRepo(tweetId)
        console.log("Fetched tweet:",tweet)
        if(tweet){
            res.status(200).json({"data":tweet})

        }
        else{
            res.status(500).json({"error":"Found tweet not found"})
        }
    } catch (
        error
    ) {
        console.log("Error in getTweetController:", error);
      
    }
}
export const createTweetController = async (req: Request, res: Response) => {
    const tweet: ITweetInterface = req.body;
    try {
      console.log("Creating tweet:", tweet);
  
      const success = await createTweetRepo(tweet);
      if (success) {
        console.log("Tweet created successfully:", tweet);
  
        const userUpdateSuccess = await updateUserWithTweetIdRepo(tweet.adminId, tweet.tweetId);

        if (userUpdateSuccess) {
          res.status(200).json({ "data": tweet });
        } else {
          console.log("Failed to update user with tweetId:", tweet.tweetId);
          res.status(500).json({ "error": "User Not updated" });
        }
      } else {
        console.log("Tweet creation failed.");
        res.status(500).json({ "error": "tweet Not Created" });
      }
    } catch (error) {
      console.log("Error in createTweetController:", error);
      res.status(500).json({ "error": error });
    }
  };
  
  export const updateTweetController = async (req: Request, res: Response) => {
    const updatedTweet: ITweetInterface = req.body;
    console.log("Received update request for tweet:", updatedTweet);

    try {
        const success = await updatedtweetRepo(updatedTweet.tweetId, updatedTweet);
        console.log("Update success status:", success);
        
        if (success) {
            res.status(200).json({ data: "Tweet Updated" });
        } else {
            console.log("Failed to update tweet with tweetId:", updatedTweet.tweetId);
            res.status(500).json({ error: "Tweet Not Updated" });
        }
    } catch (error) {
        console.log("Error in updateTweetController:", error);
        res.status(500).json({ error: error });
    }
};

export const deleteTweetController=async(req: Request,res:Response)=>{
    const tweetId=req.params.tweetId as string;
    try {
        const success=await deletetweetRepo(tweetId)
        if(success){
            res.status(200).json({"data":"Tweet deleted"})

        }
        else{
            res.status(500).json({"error":" tweet Not deleted"})
        }
    } catch (
        error
    ) {
        console.log(error)
        res.status(500).json({"error": error});
    }
}