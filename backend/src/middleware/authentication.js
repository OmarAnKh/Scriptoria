import jwt from "jsonwebtoken"
import Account from "../models/account.js"
const auth = async (req, res, next) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(token, 'thisismytoken')
        
        const user = await Account.findOne({
            _id: decoded._id, 'tokens.token': token
        })
        
        if (!user) {
            throw new Error()
        }
        
        req.token = token
        req.user = user

        next()
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate" })
    }

}



export default auth