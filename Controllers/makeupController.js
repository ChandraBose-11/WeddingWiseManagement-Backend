import Makeup from "../Models/makeupModels.js";
import User from "../Models/userModel.js";
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

export const bookMakeup = async (req, res) => {
  const id = req.params.id;
  const { eventDate } = req.body;
  try {
    if (new Date(eventDate) <= Date.now()) {
      return res.status(400).send({ message: "Date must not be a past date" });
    }
    //Find the user selected Makeup
    // console.log("restri", id);
    // console.log(req.user.id);

    const selectedMakeup = await Makeup.findById({ _id: id });
    const user = await User.findById(req.user.id);

    const verifyDate = selectedMakeup.bookedOn.filter((dates) => {
      return dates.date == eventDate;
    });
    if (verifyDate.length > 0) {
      return res
        .status(400)
        .send({ message: "Makeup already booked on that date" });
    }
    //if user has booked a Makeup then he cannot book the same Makeup to other date until that day overs
    const verifyUser = selectedMakeup.bookedOn.filter((user) => {
      return user.user == req.user.id;
    });
    console.log(verifyUser);
    if (verifyUser.length > 0) {
      return res.status(400).send({
        message: "once previous booking is done then only you can book another",
      });
    }
    selectedMakeup.bookedOn.push({ date: eventDate, user: req.user.id });
    selectedMakeup.bookedBy.push(req.user.id);
    await selectedMakeup.save();
    // calculate budget
    user.budgetSpent = selectedMakeup.price + user.budgetSpent;
    user.budgetLeft = user.budgetLeft - selectedMakeup.price;
    await user.save();
    res.status(200).send({
      message: "Booked successfully our Admin will contact you shortly",
    });
  } catch (error) {
    res.status(500).send({ message: "server error: ", error: error.message });
  }
};