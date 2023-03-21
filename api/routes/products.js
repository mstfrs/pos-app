const Product = require("../models/Product.js");
const express =require("express");
const router= express.Router();


//! get
router.get("/get-all",async(req,res)=>{
    try {
        const products= await Product.find();
        res.send(products)
        // res.status(200).json(categories)
    } catch (error) {
        res.status(400).json(error)
    }
})

//! update
router.put("/update-product",async(req,res)=>{
    try {
        await Product.findOneAndUpdate({_id:req.body.productId},req.body)
        res.status(200).json(res)
        
    } catch (error) {
        res.status(400).json(error)
    }
})


//! delete
router.delete("/delete-product",async(req,res)=>{
    try {
        await Product.findOneAndDelete({_id:req.body.productId})
        res.status(200).json("Items deleted successfully.")
        
    } catch (error) {
        res.status(400).json(error)
    }
})


//! create
router.post("/add-product", async (req,res)=>{
    try {
        const newProduct= new Product(req.body);
        await newProduct.save();
        res.status(200).json(newProduct)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports=router;