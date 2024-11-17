import Makeup from "../Models/makeupModels.js";

export const createMakeup = async (req, res) => {
  if (!req.user.Admin) {
    return res
      .status(403)
      .json({ message: "you are not allowed to createmakeup" });
  }
  if (!req.body.makeupname || !req.body.makeupDescription) {
    return res.status(400).json({ message: "All the fields are required" });
  }
  const {
    makeupname,
    makeupDescription,
    image,
    makeupLocation,
    makeupPriceRange,
  } = req.body;
  const newMakeup = new Makeup({
    makeupname,
    makeupDescription,
    image,
    makeupLocation,
    makeupPriceRange,
  });
  try {
    const savedMakeup = await newMakeup.save();
    res
      .status(200)
      .json({ message: "Makeup Created Successfully", result: savedMakeup });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllMakeup = async(req,res)=>{
    try {
      const makeup = await Makeup.find();
      res.status(200).json(makeup)  
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error in getMakeup" });
    }
}