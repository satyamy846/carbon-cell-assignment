import User from '../models/User.js';
import CustomError from '../utilities/errorHelpers/CustomErrorHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncErrorHandler from '../utilities/errorHelpers/AsyncErrorHandler.js';
import ERROR_MESSAGE from '../constants/ErrorMessages.js';
import STATUS_CODE from '../constants/StatusCode.js';


export const signupUser = asyncErrorHandler(async (req, res, next) => {
    const {
        name,
        email,
        password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    if (!user) {
        return next(new CustomError(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, STATUS_CODE.SERVER_ERROR));
    }

    const payload = {
        _id: user._id,
        email: user.email
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });

    if (!token) {
        return next(new CustomError(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, STATUS_CODE.SERVER_ERROR));
    }
    res.cookie('token', token, { httpOnly: true, secure: true })
        .status(200).json({
            message: "User is created",
            status: true,
            content: {
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    created_at: user.createdAt
                },
            }
        })
})

export const loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log("user", user);

    if (!user) {
        return next(new CustomError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND));
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    console.log("matched pass = ", matchPassword);
    // console.log("hdklsdf")
    if (!matchPassword) {
        // console.log("hellos")

        return next(new CustomError('Bad Credentials', 402));
    }
    // console.log("something")

    const payload = {
        _id: user._id,
        email: user.email
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });

    res.cookie("token", token, { httpOnly: true, secure: true })
        .status(200).json({
            message: 'Logged in',
            status: true,
            content: {
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    created_at: user.createdAt
                },
            }
        })
})


export const getapiData = asyncErrorHandler(async (req, res, next) => {
    let apiUrl = "https://api.publicapis.org/entries";
   
    const data = await fetch(apiUrl);
    const jsonData = await data.json();

    const slicedData = jsonData.entries.slice(0, 100);
    res.status(200).json({
        slicedData: slicedData,
    })
});

export const getDataByCategory = async (req, res, next) => {
    try {
        let apiUrl = "https://api.publicapis.org/entries";
        if (req.query.category) {
            apiUrl += `?category=${req.query.category}`
        }
        const data = await fetch(apiUrl);
        const jsonData = await data.json();
        res.status(200).json({
            data: jsonData,
        })
    }
    catch (err) {
        return next(new CustomError('Internal Server Error', 500))
    }
}
