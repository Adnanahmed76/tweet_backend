import { Router } from "express";
import {
     createUserController,
     deleteUserController,
      getUserController,
       updatedUserController } from "../controller/user.controller";

const userRouter=Router()

//Defile route paths

userRouter.get("/:userId",getUserController)
userRouter.post("/",createUserController)
userRouter.delete("/:userId",deleteUserController)
userRouter.put("/",updatedUserController)
export default userRouter