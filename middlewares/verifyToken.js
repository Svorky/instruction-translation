import jwt from 'jsonwebtoken';
// require('dotenv').config();
import 'dotenv/config'

const { ACCESS_TOKEN_SECRET } = process.env;

export const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.token || req.headers['x-access-token'];

    console.log('accessToken: ', accessToken);

    if(!accessToken) return res.status(401).json({message: 'unauth'})
        
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, decode)=>{
        if(error){
            return res.status(403).json({message: 'forbidden', error: error.message})
        }
        const {userid, email} = decode
        req.userid = userid
        req.email = email

        next()
    })
};