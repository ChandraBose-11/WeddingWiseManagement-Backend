import mongoose from "mongoose";

const cateringSchema = new mongoose.Schema({
 cateringname:{
    type: "string",
    required: true,
    unique: true,
 },
 cateringDescription:{
    type: "string",
    required: true,
 },
 image:{
    type:"string",
    default:"https://5.imimg.com/data5/SELLER/Default/2021/11/JX/RO/DO/30368866/indian-food-catering-service-500x500.jpg"
 },
 cateringLocation:{
    type: "string",
      required: true,
 },
cateringPriceRange:{
    type: "string",
      required: true,
},
bookedOn: {
   //both dates and user
   type: [Object],
   default: [],
 },
 bookedBy: {
   type: [String],
   default: [],
 },
},
{ timestamps: true }
);

const Catering= mongoose.model("Catering",cateringSchema);

export default Catering;