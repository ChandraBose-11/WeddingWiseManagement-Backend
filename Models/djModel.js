import mongoose from "mongoose";

const djSchema = new mongoose.Schema(
  {
    djname: {
      type: "string",
      required: true,
      unique: true,
    },
    djDescription: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      default:
        "https://img.freepik.com/premium-photo/dj-is-playing-music-front-colorful-background_976492-17183.jpg",
    },
    djLocation: {
      type: "string",
      required: true,
    },
    djPriceRange: {
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

const DJ = mongoose.model("DJ", djSchema);
export default DJ;
