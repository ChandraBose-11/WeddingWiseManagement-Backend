import Catering from "../Models/cateringModel.js";
import User from "../Models/userModel.js";

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

export const bookCatering = async(req,res)=>{
  const id=req.params.id;
  const {eventDate}=req.body;
  try {
    if(new Date(eventDate)<= Date.now()){
      return res.status(400).send({ message: "Date must not be a past date" });
    }
    //Find the user selected catering
    console.log("restri",id);
    console.log(req.user.id);
    
    const selectedCatering=await Catering.findById({_id:id});
    const user=await User.findById(req.user.id);

  

     
    const verifyDate=selectedCatering.bookedOn.filter((dates)=>{
      return dates.date == eventDate;
    });
    if(verifyDate.length>0){
      return res.status(400).send({ message: "catering already booked on that date" });
    }
       //if user has booked a catering then he cannot book the same catering to other date until that day overs
       const verifyUser= selectedCatering.bookedOn.filter((user)=>{
        return user.user == req.user.id;
       });
       console.log(verifyUser);
       if(verifyUser.length>0){
        return res.status(400).send({
          message: "once previous booking is done then only you can book another",
        });
       }
       selectedCatering.bookedOn.push({date:eventDate,user:req.user.id});
       selectedCatering.bookedBy.push(req.user.id);
       await selectedCatering.save();
       // calculate budget
       user.budgetSpent = selectedCatering.price + user.budgetSpent;
       user.budgetLeft = user.budgetLeft- selectedCatering.price;
       await user.save();
       res.status(200).send({
        message: "Booked successfully our Admin will contact you shortly",
      });
  } catch (error) {
    res.status(500).send({ message: "server error: ", error: error.message });
  }
}