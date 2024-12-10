import mongoose from 'mongoose'
import productmodel from "../models/product.model.js";
export const getproducts= async(req,res)=>{
    try{
      const serchedproducts=await productmodel.find({});
      res.status(200).json({success:true,data:serchedproducts})
    }catch(error){
      console.log("error in getting products",error.message)
        res.status(404).json({sucess:false,message:"error"})  
    }
  }
  export const postproducts=async (req,res)=>{
    const productcredentils=req.body;
    if(!productcredentils.name||!productcredentils.price||!productcredentils.image){
      res.status(400).json({sucess:false,message:"please provide all feilds"});
    }
      const newproduct= new productmodel(productcredentils)
      try{
        await newproduct.save();
        return res.status(201).json({ success: true, message: "Product created successfully" });
      }catch(error){
        console.log("error in creating product",error.message)
        return res.status(500).json({ success: false, message: "Server error" });
      }
  }
  export const putproducts=async(req,res)=>{
    const {id}=req.params
    const productupdate=req.body
    try{
     const updatedproduct= await productmodel.findByIdAndUpdate(id,productupdate,{new:true})
      res.status(200).json({sucess:true,data:updatedproduct})
    }catch(error){
      console.log("error in creating product",error.message)
      res.status(503).json({sucess:false,message:"server error"})
    }
  }
  export const deleteproducts=async(req,res)=>{
    const {id}=req.params
    try{
      await productmodel.findByIdAndDelete(id);
      res.status(200).json({success:true,message:"productd deleted"})
    }catch(error){
      console.log("error in deleting products",error.message)
      
    }
  }