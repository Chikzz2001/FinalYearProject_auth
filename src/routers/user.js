const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// create user=============================
router.post("/users", function (req, res) {
    console.log(req.body);
    const newuser = new User(req.body);
    newuser.save().then(function (result) {
        res.redirect("/login");
    }).catch(function (err) {
        console.log(err);
        res.send("Error: Account creation failed");
    })

})

// Login a user ======================================
router.post("/users/login", async (req, res) => {
    console.log(req.body);
    try {
        const authenticatedUser = await User.checkLoginCredentials(req.body.aadhaar, req.body.password);
        const token = await authenticatedUser.generateAuthTokens();
        console.log(token);

        res.cookie("BloodCamp", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true
        })
        res.redirect("/profile");
    }
    catch (err) {
        console.log(err);
        res.send("Error: Login failed");
    }
})

// logout a user :
router.get("/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token !== req.cookies.WiseMeal;
        })
        await req.user.save();
        res.clearCookie("BloodCamp");
        res.redirect("/logout");
    }
    catch (error) {
        res.status(400).send(error);
    }
})

// Read my profile
router.get("/user/me", auth, async function (req, res) {
    res.send(req.user);
})


module.exports = router;