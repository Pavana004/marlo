const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../Modal/usermodal");
require("dotenv").config();




//register

router.post("/register", async (req, res) => {

    try {
        const emailExit = await user.findOne({ email: req.body.email })
        if (emailExit) {
            return res.status(400).json("Email already taken");
        }
        const psHash = await bcrypt.hash(req.body.password, 10);
        const data = new user({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            dob: req.body.dob,
            phone: req.body.phone,
            email: req.body.email,
            password: psHash,
            occupation: req.body.occupation,
            company: req.body.company,
        });
        const result = await data.save();
        res.json(result);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});


//login

router.post("/login", async (req, res) => {
    try {
        const userExit = await user.findOne({ email: req.body.email })
        if (!userExit) {
            return res.status(400).json("Your Email Wrong");
        }
        const passwordValidation = await bcrypt.compare(req.body.password, userExit.password);
        if (!passwordValidation) {
            return res.status(400).json("Your Password Wrong");
        }
        const userToken = jwt.sign({ email: userExit.email },process.env.JWTKEY, { expiresIn: "2d" });
        res.header("auth", userToken).send(userToken);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });

    }
})

//userget


router.get("/userdetails/:id", async (req,res)=>{
    try {
        const userInfo = await user.findById(req.params.id);
        res.status(200).json(userInfo);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})




//userUpdate

router.put("/userupdate/:id", async (req,res)=>{
    try {
        const userInfo = await user.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(userInfo);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})




//userDelete

router.delete("/userdelete/:id", async (req,res)=>{
    try {
        await user.findByIdAndDelete(req.params.id)
        res.status(200).json("delete successfully");

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
})



module.exports = router;