const User = require("../models/user-models");
const userData =async(req, res)=>{
try {
    const finalUserData = req.user
    console.log(finalUserData);
    
   return res.status(200).json({msg:finalUserData})
} catch (error) {
    console.log("error from the route",error);
    
}
}

module.exports = {userData}