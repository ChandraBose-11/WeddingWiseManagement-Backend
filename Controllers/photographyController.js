import Photography from "../Models/photographyModel.js";


export const CreatePhotography = async (req,res)=>{
    if(!req.user.Admin){
        return res
      .status(403)
      .json({ message: "you are not allowed to create a photography" });
    }
    if (!req.body.photographyname || !req.body.photographyDescription) {
        return res.status(400).json({ message: "All the fields are required" });
      }
      const {
        photographyname,
        photographyDescription,
        image,
        photographyLocation,
        photographyPriceRange
      }=req.body;
      const newPhotography = new Photography({
        photographyname,
        photographyDescription,
        image,
        photographyLocation,
        photographyPriceRange
      });
      try {
        const savedPhotography = await newPhotography.save();
        res
      .status(200)
      .json({ message: "Photography Created Successfully", result: savedPhotography });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
};

export const getAllPhotography = async (req, res) => {
    try {
      const photography = await Photography.find();
      res.status(200).json(photography);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error in getResort" });
    }
  };