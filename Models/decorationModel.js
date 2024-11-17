import mongoose from "mongoose";

const decorSchema = new mongoose.Schema(
    {
        decorname: {
          type: "string",
          required: true,
          unique: true,
        },
        decorDescription: {
          type: "string",
          required: true,
        },
        image: {
          type: "string",
          default:
          "https://i.pinimg.com/736x/c4/07/ee/c407eea6b39793bd80141160fa647af5.jpg"
        },
        decorLocation: {
          type: "string",
          required: true,
        },
        decorPriceRange: {
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

    const Decor = mongoose.model ("Decor",decorSchema);
    export default Decor;