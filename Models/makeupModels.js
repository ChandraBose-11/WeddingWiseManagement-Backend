import mongoose from "mongoose";

const makeupSchema = new mongoose.Schema(
  {
    makeupname: {
      type: "string",
      required: true,
      unique: true,
    },
    makeupDescription: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      default:
        "https://i.pinimg.com/736x/78/64/fd/7864fd1be915268fc7eb068a8145c2fa.jpg",
    },
    makeupLocation: {
      type: "string",
      required: true,
    },
    makeupPriceRange: {
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

const Makeup = mongoose.model("Makeup", makeupSchema);
export default Makeup;
