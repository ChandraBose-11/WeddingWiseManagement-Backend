import DJ from "../Models/djModel.js";
import User from "../Models/userModel.js";

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

  export const bookDJ = async (req, res) => {
    const id = req.params.id;
    const { eventDate } = req.body;
    try {
      if (new Date(eventDate) <= Date.now()) {
        return res.status(400).send({ message: "Date must not be a past date" });
      }
      //Find the user selected DJ
      // console.log("restri", id);
      // console.log(req.user.id);
  
      const selectedDJ = await DJ.findById({ _id: id });
      const user = await User.findById(req.user.id);
  
      const verifyDate = selectedDJ.bookedOn.filter((dates) => {
        return dates.date == eventDate;
      });
      if (verifyDate.length > 0) {
        return res
          .status(400)
          .send({ message: "DJ already booked on that date" });
      }
      //if user has booked a DJ then he cannot book the same DJ to other date until that day overs
      const verifyUser = selectedDJ.bookedOn.filter((user) => {
        return user.user == req.user.id;
      });
      console.log(verifyUser);
      if (verifyUser.length > 0) {
        return res.status(400).send({
          message: "once previous booking is done then only you can book another",
        });
      }
      selectedDJ.bookedOn.push({ date: eventDate, user: req.user.id });
      selectedDJ.bookedBy.push(req.user.id);
      await selectedDJ.save();
      // calculate budget
      user.budgetSpent = selectedDJ.price + user.budgetSpent;
      user.budgetLeft = user.budgetLeft - selectedDJ.price;
      await user.save();
      res.status(200).send({
        message: "Booked successfully our Admin will contact you shortly",
      });
    } catch (error) {
      res.status(500).send({ message: "server error: ", error: error.message });
    }
  };
  