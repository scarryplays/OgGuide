const User = require("../models/user-models");
const bcrypt = require("bcryptjs");
const axios = require("axios");


// ---------------------------------------
const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    // const password =req.body;


    const userExist4 = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    // const userExist5 = await User.findOne({username})

    if (!userExist4) {
      return res.status(404).send({ msg: "invalid credentail" })
    }
   

    const isPasswordValid = await bcrypt.compare(password, userExist4.password)
    //   console.log("ye hashed pass hai",isPasswordValid);

    if (isPasswordValid) {
      res.status(201).send({
        msg: "login succesfully",
        token: await userExist4.generateToken(),
        userId: userExist4._id > toString()
      });

    } else {
      res.status(500).json("invalid email or password")
    }



  } catch (error) {
    res.status(200).send({ msg: "internal server error" })

  }


}


module.exports = { login };