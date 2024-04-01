import mongoose from "mongoose";
import validator from 'validator';
const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required:[true, 'Name is required']
    },
    email:{
        type: String,
        unique:[true, 'Email must be unique'],
        required: [true,'Email is required'],
        lowercase: true,
        trim: true,
        minlength: 7,
        maxlength: 25,
        validate: (value)=>{
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        //This validation is not working please fix this
        validate: (value) =>{
            if(!validator.isStrongPassword(value)){
                throw new Error('Password must be minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1')
            }
        }

    },
}, {timestamps: true});

const User = new mongoose.model("user", userSchema);

export default User;