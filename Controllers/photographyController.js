import Photography from "../Models/photographyModel.js";
import User from "../Models/userModel.js";

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

  export const bookPhotography = async(req,res)=>{
    const id = req.params.id;
    const { eventDate } = req.body; 
    try {
      if (new Date(eventDate) <= Date.now()) {
        return res.status(400).send({ message: "Date must not be a past date" });
      }
      const selectedPhotography = await Photography.findById({ _id: id });
    const user = await User.findById(req.user.id);

    const verifyDate = selectedPhotography.bookedOn.filter((dates) => {
      return dates.date == eventDate;
    });
    if (verifyDate.length > 0) {
      return res
        .status(400)
        .send({ message: "Photography already booked on that date" });
    }
    const verifyUser = selectedPhotography.bookedOn.filter((user) => {
      return user.user == req.user.id;
    });
    console.log(verifyUser);
    if (verifyUser.length > 0) {
      return res.status(400).send({
        message: "once previous booking is done then only you can book another",
      });
    }
    selectedPhotography.bookedOn.push({ date: eventDate, user: req.user.id });
    selectedPhotography.bookedBy.push(req.user.id);
    await selectedPhotography.save();
    // calculate budget
    user.budgetSpent = selectedPhotography.price + user.budgetSpent;
    user.budgetLeft = user.budgetLeft - selectedPhotography.price;
    await user.save();
    res.status(200).send({
      message: "Booked successfully our Admin will contact you shortly",
    });
    } catch (error) {
      res.status(500).send({ message: "server error: ", error: error.message });
    }
  }