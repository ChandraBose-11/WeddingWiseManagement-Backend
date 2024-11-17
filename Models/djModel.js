import mongoose from "mongoose";

const djSchema = new mongoose.Schema({
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
          "https://i.pinimg.com/736x/78/64/fd/7864fd1be915268fc7eb068a8145c2fa.jpg",
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

  const DJ = mongoose.model("DJ",djSchema);
  export default DJ;