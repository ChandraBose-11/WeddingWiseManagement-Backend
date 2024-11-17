import Decor from "../Models/decorationModel.js";

export const createDecor = async (req, res) => {
    if (!req.user.Admin) {
      return res
        .status(403)
        .json({ message: "you are not allowed to createdecoration" });
    }
    if (!req.body.decorname || !req.body.decorDescription) {
      return res.status(400).json({ message: "All the fields are required" });
    }
    const {
      decorname,
      decorDescription,
      image,
      decorLocation,
      decorPriceRange,
    } = req.body;
    const newDecor = new Decor({
        decorname,
        decorDescription,
        image,
        decorLocation,
        decorPriceRange,
    });
    try {
      const savedDecor= await newDecor.save();
      res
        .status(200)
        .json({ message: "DJ Created Successfully", result: savedDecor });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  export const getAllDecor = async(req,res)=>{
      try {
        const decor = await Decor.find();
        res.status(200).json(decor)  
      } catch (error) {
          res.status(500).json({ message: "Internal Server Error in getdecoration" });
      }
  }