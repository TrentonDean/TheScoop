const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({ 
    firstName: {type:String, required:[true, "First name is required"], minLength:[2, "First name must be more than 2 characters"]},
    lastName: {type: String, required:[true, "Last name is required"], minLength:[2, "Last name must be more than 2 characters"]},
    email: {type: String, required:[true, "Email is required"], validate: {validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val), message: "Please enter a valid email"}},
    password: {type: String, required:[true, "Password is required"], minLength:[8, "Password must be more than 8 characters"]}
}, { timestamps: true });

UserSchema.pre('save', async function(next){                // Hash password with bcrypt
    try{
        const hashedPassword = await bcrypt.hash(this.password, 10)
        console.log("hashed pw: ", hashedPassword)
        this.password = hashedPassword
        next()
    }catch{
        console.log('error in save', error)
    }
})

module.exports = mongoose.model('User', UserSchema);