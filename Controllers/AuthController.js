const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserModel = require('../Models/Users')
const signup = async (req, res) => {
    try {
        const { name, email, password, agreeTerms } = req.body;
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(409).json({message:"User Already Existed Signin.",success: false})
        }
        const userModel = new UserModel({
            name,
            email,
            password,
            agreeTerms,
        });
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save()
        res.status(201).json({
            message: "Signup Success",
            success: true,
        })
    } catch (err) {
        //console.error(err); // 👈 ADD THIS
        res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}

const login = async  (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            return res.status(403).json({message:"Auth failed email or password is wrong",success:false})
        }

        const is_password_equal = await bcrypt.compare(password, user.password);

        if (!is_password_equal) {
            return res.status(403).json({message:"Auth failed email or password is wrong",success:false})
        }

        const jwttoken = jwt.sign(
            { email: user.email, _id: user._id },
            "nakul1",
            { expiresIn: '24h' }
        )  

        res.status(200).json({
            name: user.name,
            email: user.email,
            agreeTerms: user.agreeTerms,
            jwttoken,
            message: "Login Successfully",
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

module.exports = {
    signup,
    login
}