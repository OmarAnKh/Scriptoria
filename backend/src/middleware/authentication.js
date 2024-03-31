import jwt from "jsonwebtoken"
import Account from "../models/account.js";
const authentication = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Account.findOne({ _id: decode._id, "tokens.token": token })
        if (!user) {
            throw new Error("No user found");
        }
        req.token = token
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please auth" });
    }

}

export default authentication
