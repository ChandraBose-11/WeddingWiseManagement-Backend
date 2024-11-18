import Resort from "../Models/resortModel.js";
import User from "../Models/userModel.js";

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

export const bookResort = async(req,res)=>{
  const id = req.params.id;
  const {eventDate}=req.body;
  try {
    if (new Date(eventDate) <= Date.now()) {
      return res.status(400).send({ message: "Date must not be a past date" });
    }
    const selectedResort = await Resort.findById({_id:id});
    const user = await User.findById(req.user.id);
    const verifyDate = selectedResort.bookedOn.filter((dates) => {
      return dates.date == eventDate;
    });
    if (verifyDate.length > 0) {
      return res
        .status(400)
        .send({ message: "resort already booked on that date" });
    }
       //if user has booked a resort then he cannot book the same resort to other date until that day overs
       const verifyUser = selectedResort.bookedOn.filter((user) => {
        return user.user == req.user.id;
      });
      console.log(verifyUser);
    if (verifyUser.length > 0) {
      return res.status(400).send({
        message: "once previous booking is done then only you can book another",
      });
    }
    selectedResort.bookedOn.push({ date: eventDate, user: req.user.id });
    selectedResort.bookedBy.push(req.user.id);
    await selectedResort.save();
    // calculate budget
    user.budgetSpent = selectedResort.price + user.budgetSpent;
    user.budgetLeft = user.budgetLeft - selectedResort.price;
    await user.save();
    res.status(200).send({
      message: "Booked successfully our Admin will contact you shortly",
    });
  } catch (error) {
    res.status(500).send({ message: "server error: ", error: error.message });
  }
}