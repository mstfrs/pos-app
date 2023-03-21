const Bill=require("../models/Bill.js")
const express= require("express")

const router=express.Router()


//! get
router.get("/get-all", async(req,res)=>{
    try {
        const bills=await Bill.find();
        res.send(bills)

    } catch (error) {
        console.log(error)
    }
})

//! create
router.post("/add-bill",async(req,res)=>{
    try {
        const newProduct=new Bill(req.body);
        await newProduct.save();
        res.status(200).json(newProduct)
        
    } catch (error) {
        res.status(400).json(error)
    }
} )

//! update
router.put("/update-bill",async(req,res)=>{
    try {
        await Bill.findByIdAndUpdate({_id:req.body._id},req.body)
        res.status(200).json("Item updated successfully.")
        
    } catch (error) {
        res.status(400).json(error)
    }
} )

//! delete
router.delete("/delete-bill",async(req,res)=>{
    try {
        await Bill.findByIdAndDelete({_id: req.body._id})
        res.status(200).json("Item deleted successfully.")
        
    } catch (error) {
        res.status(400).json(error)
    }
} )

module.exports=router;