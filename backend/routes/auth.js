const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'kang2001';

// ---------------------------create a user----------------------------

router.post('/createuser', [

    body('name', 'Name should be unique and min 4 char long').isLength({ min: 4 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should be 5 char long').isLength({ min: 5 }),
], async (req, res) => {

    let success = false;

    // check if email already exists
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "user with this email alrady exists" })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: hash,
            email: req.body.email,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        var token = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, token })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }

})




//---------------------------Login----------------------------

router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should be 5 char long').exists(),
], async (req, res) => {

    let success = false;

    // check if email already exists
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, errors: 'please try again' });

        }

        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            return res.status(400).json({ success, errors: 'please try again' });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, token });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
});


//---------------------------Details---------------------------

router.post('/details', fetchuser, async (req, res) => {
    try {
        userid = req.user.id;
        const user = await User.findById(userid).select("-password")
        
        res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error occured");
    }
})



module.exports = router