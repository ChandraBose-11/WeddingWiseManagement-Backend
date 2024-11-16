import Catering from "../Models/cateringModel.js";

export const createCatering = async (req, res) => {
  if (!req.user.Admin) {
    return res
      .status(403)
      .json({ message: "you are not allowed to createcatering" });
  }

  if (!req.body.cateringname || !req.body.cateringDescription) {
    return res.status(400).json({ message: "All the fields are required" });
  }
  const {
    cateringname,
    cateringDescription,
    image,
    cateringLocation,
    cateringPriceRange,
  } = req.body;
  const newCatering = new Catering({
    cateringname,
    cateringDescription,
    image,
    cateringLocation,
    cateringPriceRange,
  });
  try {
    const savedCatering = await newCatering.save();
    res
      .status(200)
      .json({
        message: "Catering Created Successfully",
        result: savedCatering,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllCatering = async(req,res)=>{
    try {
        const catering = await Catering.find();
        res.status(200).json(catering);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error in getResort" });
    }
};
