const express = require('express')
const { User,Account } = require('../db')
const zod = require('zod')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../config')
const { authMiddleware } = require('../middleware')
const router = express.Router()

const signupSchema = zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName : zod.string(),
    password : zod.string()
})

const signinSchema = zod.object({
    username : zod.string(),
    password :zod.string()
})

router.post('/signup',async function(req,res){
    const body = req.body
    const {success} = signupSchema.safeParse(req.body)
    if (!success){
        return res.status(411).json({msg:'invalid Email or password'})
    }
    const existinguser = await User.findOne({
        username : body.username
    })
    if (existinguser){
        return res.status(411).json({msg:'email already exist'})
    }
    const dbUser = await User.create(body);
    const userId = dbUser._id
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    const token = jwt.sign({userId},jwtSecret.jwtSecret)
     res.status(200).json({msg:'Admin created successfully',token:token})
})

router.post('/signin',async function(req,res){
    const body = req.body
    const {success} = signinSchema.safeParse(req.body)
    if (!success){
        return res.json({msg:'invalid Email or password'})
    }
    const user = await User.findOne({
        username : body.username,
        password : body.password
    })
    if (user){
        const userId = user._id
        const token = jwt.sign({userId},jwtSecret.jwtSecret)
        return res.status(200).json({msg:'Signin Successfully',token:token})
    }
     res.status(411).json({msg:'plz create account'})
})

router.put('/user/:id',authMiddleware,async(req,res)=>{
    const id = req.params.id;
    const user = await User.find({_id : id}) 
    for (let i in user){
        await User.updateOne(user[i],req.body)
    }
    res.json({msg : 'Updated successfully'})
})

router.post('/:id',authMiddleware,async(req,res)=>{
    const id = req.params.id;
    const user = await User.find({_id : id}) 
    // console.log(user)
    res.json(user)
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }}, {
            lastName: {
                "$regex": filter
          }},{
            username : {
                "$regex" : filter
            }
          }]
    })
    // console.log(users)
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = router