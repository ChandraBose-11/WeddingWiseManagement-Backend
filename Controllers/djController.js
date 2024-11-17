import DJ from "../Models/djModel.js";

export const createDJ = async (req, res) => {
    if (!req.user.Admin) {
      return res
        .status(403)
        .json({ message: "you are not allowed to createdj" });
    }
    if (!req.body.djname || !req.body.djDescription) {
      return res.status(400).json({ message: "All the fields are required" });
    }
    const {
      djname,
      djDescription,
      image,
      djLocation,
      djPriceRange,
    } = req.body;
    const newDJ = new DJ({
        djname,
        djDescription,
        image,
        djLocation,
        djPriceRange,
    });
    try {
      const savedDJ = await newDJ.save();
      res
        .status(200)
        .json({ message: "DJ Created Successfully", result: savedDJ });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
  export const getAllDJ = async(req,res)=>{
      try {
        const dj = await DJ.find();
        res.status(200).json(dj)  
      } catch (error) {
          res.status(500).json({ message: "Internal Server Error in getdj" });
      }
  }