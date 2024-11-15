import Resort from "../Models/resortModel.js";

export const createResort = async (req, res) => {
  if (!req.user.Admin) {
    return res
      .status(403)
      .json({ message: "you are not allowed to create a resort" });
  }
  if (!req.body.resortname || !req.body.resortDescription) {
    return res.status(400).json({ message: "All the fields are required" });
  }
  const {
    resortname,
    resortDescription,
    image,
    resortLocation,
    resortPriceRange,
  } = req.body;

  const newResort = new Resort({
    resortname,
    resortDescription,
    image,
    resortLocation,
    resortPriceRange,
  });
  try {
    const savedResort = await newResort.save();
    res
      .status(200)
      .json({ message: "Resort Created Successfully", result: savedResort });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllResorts = async (req, res) => {
  try {
    const resort = await Resort.find();
    res.status(200).json(resort);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error in getResort" });
  }
};
