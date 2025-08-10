import mongoose from "mongoose";

export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://harinipsp:ram4112004@cluster0.u8rdj.mongodb.net/food-del').then(()=>console.log("DB conneccted"));
}