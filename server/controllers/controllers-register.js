const User = require("../models/user-models");
const bcrypt = require("bcryptjs");
// const axios = require("axios");




const register = async (req, res) => {
    try {
        // console.log("user resgiter data ", req.body);
        const { name, email, phone, username, password } = req.body;

        const userExist1 = await User.findOne({ email })
        if (userExist1) {
            return res.status(400).json({ msg: "email already exist" });
        }
        const userExist2 = await User.findOne({ username })
        if (userExist2) {
            return res.status(400).json({ msg: "username already exist" });
        }
        //    const userExist3 = await User.findOne({ phone })
        //    if (userExist3) {
        //     return res.status(400).json({msg:"phone already exist"});
        //    }


        //    ---------------
        //    hash password
        //    -----------------
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound)
        //    ---------------
        //    hash password
        //    -----------------

        const userCreated = await User.create({ name, email, phone, username, password: hash_password });

        res.status(201).send({ msg: "registered succesfully", token: await userCreated.generateToken(), userId: userCreated._id > toString() });
        // res.status(200).send("welcome to my register page");
    } catch (error) {
        res.status(404).json("internal server error")
        // console.log(error);


    }
}


module.exports = { register }