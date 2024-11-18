import Decor from "../Models/decorationModel.js";
import User from "../Models/userModel.js";
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

  export const bookDecor = async (req, res) => {
    const id = req.params.id;
    const { eventDate } = req.body;
    try {
      if (new Date(eventDate) <= Date.now()) {
        return res.status(400).send({ message: "Date must not be a past date" });
      }
      //Find the user selected Decor
      // console.log("restri", id);
      // console.log(req.user.id);
  
      const selectedDecor = await Decor.findById({ _id: id });
      const user = await User.findById(req.user.id);
  
      const verifyDate = selectedDecor.bookedOn.filter((dates) => {
        return dates.date == eventDate;
      });
      if (verifyDate.length > 0) {
        return res
          .status(400)
          .send({ message: "Decoration already booked on that date" });
      }
      //if user has booked a Decor then he cannot book the same Decor to other date until that day overs
      const verifyUser = selectedDecor.bookedOn.filter((user) => {
        return user.user == req.user.id;
      });
      console.log(verifyUser);
      if (verifyUser.length > 0) {
        return res.status(400).send({
          message: "once previous booking is done then only you can book another",
        });
      }
      selectedDecor.bookedOn.push({ date: eventDate, user: req.user.id });
      selectedDecor.bookedBy.push(req.user.id);
      await selectedDecor.save();
      // calculate budget
      user.budgetSpent = selectedDecor.price + user.budgetSpent;
      user.budgetLeft = user.budgetLeft - selectedDecor.price;
      await user.save();
      res.status(200).send({
        message: "Booked successfully our Admin will contact you shortly",
      });
    } catch (error) {
      res.status(500).send({ message: "server error: ", error: error.message });
    }
  };
  