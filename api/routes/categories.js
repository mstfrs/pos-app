const Category = require("../models/Category.js");
const express =require("express");
const router= express.Router();


//! get
router.get("/get-all",async(req,res)=>{
    try {
        const categories= await Category.find();
        res.send(categories)
        // res.status(200).json(categories)
    } catch (error) {
        console.log(error);
    }
})

//! update
router.put("/update-category",async(req,res)=>{
    try {
        await Category.findOneAndUpdate({_id:req.body.categoryId},req.body)
        res.status(200).json("Items updated successfully.")
        
    } catch (error) {
        res.status(400).json(error)
    }
})


//! delete
router.delete("/delete-category",async(req,res)=>{
    try {
        await Category.findOneAndDelete({_id:req.body.categoryId})
        res.status(200).json("Items deleted successfully.")
        
    } catch (error) {
        res.status(400).json(error)
    }
})


//! create
router.post("/add-category", async (req,res)=>{
    try {
        const newCategory= new Category(req.body);
        await newCategory.save();
        res.status(200).json(newCategory)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports=router;