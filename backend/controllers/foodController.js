import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
   try {
       // Check if the file is uploaded
       if (!req.file) {
           return res.status(400).json({ success: false, message: "Image file is required" });
       }

       // Extract filename
       let image_filename = `${req.file.filename}`;

       // Create a new food item
       const food = new foodModel({
           name: req.body.name,
           description: req.body.description,
           price: req.body.price,
           image: image_filename,
           category: req.body.category
           
       });

       // Save the food item to the database
       await food.save();

       // Respond with success message
       res.json({ success: true, message: "Food added" });
   } catch (error) {
       console.error(error);
       res.status(500).json({ success: false, message: "Error adding food" });
   }
};

// all food list
const listFood = async(req,res) =>{
    try {
        const food = await foodModel.find({});
        res.json({success:true,data: food})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove food

const removeFood = async(req,res)=>{
try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"Food removed"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}
export { addFood , listFood , removeFood};
