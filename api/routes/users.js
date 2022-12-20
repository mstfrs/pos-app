const User=require("../models/User.js")
const express= require("express")

const router=express.Router()


//! get all Users
router.get("/get-all", async(req,res)=>{
    try {
        const users=await User.find();
        res.send(users)

    } catch (error) {
        res.status(400).json(error)
    }
})

//! get a User
router.get("/", async(req,res)=>{
    const userId=req.body.userId;
    try {
        const user=await User.findById(userId)
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports=router;