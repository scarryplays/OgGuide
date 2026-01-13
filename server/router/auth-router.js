const express = require("express");
const router = express.Router();

const controllersHome = require("../controllers/controllers-home")
const controllersRegister = require("../controllers/controllers-register")
const controllersLogin = require("../controllers/controllers-login")
const controllersChatBox = require("../controllers/controllers-chatbox")
const controllersUserData = require("../controllers/controllers-user")
const authMiddleWare= require("../middlewares/auth-middleware")
router.route("/home").get(controllersHome.home);
router.route("/chatbox").get(controllersChatBox.chatBox);

router.route("/register").post(controllersRegister.register);
router.route("/login").post(controllersLogin.login);


router.route("/about").get((req, res) => {
    res.status(200).send("welcome to my about us page");
});
// router.route("/user").get(authMiddleWare,controllersUserData.userData);



router.route("/contact").get((req, res) => {
    res.status(200).send("welcome to my contact page");
});


router.route("/service").get((req, res) => {
    res.status(200).send("welcome to my service page");
});

module.exports = router;