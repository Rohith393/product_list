import { mongoose } from "mongoose";

const modelschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},
{
    timestamps: true, 
});
const productmodel=mongoose.model('Product',modelschema)
export default productmodel;