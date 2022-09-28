const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import express from 'express';
const {valiadationResult} = require('express-validator');

const generateAccessToken = (id:any, email:any, role:any) =>{
    const payload = {
        id,
        email,
        role
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'});
}
class userController {
    async registration (req:express.Request,res:express.Response) {
         try {
            //const errors = valiadationResult(req);
            //if(!errors.isEmpty()){
            //return res.status(400).json({message: "Registration error", errors});
            //}
            const {email, password} = req.body;
            const candidate = await User.findOne({where:{email}});
            if(candidate){
                return res.status(400).json({message:'User with this data was created earlier'});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({email, password: hashPassword});
            await user.save();
            res.json({message: 'User was created'});
         }catch(e) {
             console.log(e);
             return res.status(400).json('Registration error');
         }
     }
 
     async login (req:express.Request,res:express.Response) {
         try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({message: `User with ${email} not found`});
            }
            const validPassword = bcrypt.compareSync(user.password, password);
            if(!validPassword){
                return res.status(400).json({message: `Password is not correct. Please, check one time more`});
            }

            const token = generateAccessToken(user.id, user.email, user.role);
            return res.json({token});
         }catch(e) {
             console.log(e);
         }
     }
 
     async getUsers (req:express.Request,res:express.Response) {
         try {
            res.json('Hello');
         }catch(e) {
             console.log(e);
         }
     }
 }
 
 module.exports = new userController();