import mongoose from "mongoose";

const photographySchema = new mongoose.Schema({
    photographyname:{
        type: "string",
        required: true,
        unique: true,
     },
     photographyDescription:{
        type: "string",
        required: true,
     },
     image:{
        type:"string",
        default:"https://images.squarespace-cdn.com/content/v1/549ed406e4b031a7658c3dc1/1461496193980-41STQXH1DDV9LINJLK7V/Wedding_Travellers_Destination_Wedding_Photography-230.jpg"
     },
     photographyLocation:{
        type: "string",
          required: true,
     },
    photographyPriceRange:{
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

    const Photography = mongoose.model("Photography",photographySchema);

    export default Photography;