const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY;

module.exports = {

    registerUser: async (req,res)=>{        // register a new user
        try{
            const newUser = await User.create(req.body)     // creates user before moving on

            const userToken = jwt.sign({_id:newUser._id,email:newUser.email},SECRET)    // creates JWT

            res.status(201).cookie('firstName',newUser.firstName).cookie('lastName',newUser.lastName).json({successMessage:"User logged in",user:newUser})     // creates a cookie of first name and last name
        }catch(error){
            res.status(400).json(error)
        }
    },

    loginUser: async (req,res) => {               // login user
        const user = await User.findOne({email:req.body.email})     // looks for user with that email

        if(!user){                                                  // if the user isn't found
            res.status(400).json({error:"invalid email/password"})
        }

        try{
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)  // compares entered password to password in db, does need to be in that order
            if(!isPasswordValid){
                res.status(400).json({error:"invalid email/password"})
            }else{
                const userToken = jwt.sign({_id:user._id,email:user.email},SECRET)
                res.status(201).cookie('firstName',user.firstName).cookie('lastName',user.lastName).json({successMessage:"User logged in",user:user})
            }
        }catch(error){
            res.status(400).json({error:"invalid email/password"})
        }
    },

    logOutUser:(req,res) => {       //logs user out
        res.clearCookie('firstName')
        res.clearCookie('lastName')
        res.json({success:"User logged out"})
    },
}