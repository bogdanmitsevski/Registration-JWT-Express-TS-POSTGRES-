import express from 'express';
const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from "express"

const { User } = require ("../src/typings/express/custom");
class authMiddleware {
  isAuth (req: express.Request,res: express.Response, next:any) {
    if(req.method === "OPTIONS") {
        next();
    }

    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) {
            return res.status(403).json({message: "User is not authorized"});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch(e) {
        console.log(e);
        return res.status(403).json({message: "User is not authorized"});
    }
}
}

module.exports = new authMiddleware();