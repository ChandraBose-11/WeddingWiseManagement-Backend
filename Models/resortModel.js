import mongoose from "mongoose";

const resortSchema = new mongoose.Schema(
  {
    resortname: {
      type: "string",
      required: true,
      unique: true,
    },
    resortDescription: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzzBDDBFburz_4lVm9EF8r3WM-KnxT4nKCqA&s",
    },
    resortLocation: {
      type: "string",
      required: true,
    },
    resortPriceRange: {
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

const Resort = mongoose.model("Resort", resortSchema);

export default Resort;
