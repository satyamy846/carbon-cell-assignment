import User from "../models/User.js";
import CustomError from "../utilities/errorHelpers/CustomErrorHandler.js";
import jwt from 'jsonwebtoken';
const authenticate = async (req, res, next) => {
    try {
        let token = req.cookies['token'];


        if (!token) {

            return next(new CustomError('Unauthorized  Access!', 401));
        }

        try {

            const validatedToken = await jwt.verify(token, process.env.SECRET_KEY);

            const user = await User.findOne({ _id: validatedToken._id });

            if (!user) {

                return next(new CustomError('Unauthorized  Access!', 401));
            }

            req.user = user;


        }
        catch (err) {


            return next(new CustomError('Unauthorized Access!', 401));
        }
        next();
    }
    catch (err) {

        return next(new CustomError('Unauthorized Access!', 401));
    }
}

export default authenticate;