// backend/routes/account.js
const express = require('express');
const { Account, User } = require('../db');
const { authMiddleware } = require('../middleware');
const router = express.Router();

router.get('/',authMiddleware,async(req,res) => {
    let account = await Account.find({userId : req.userId})
    let balance = 0;  
    for (let i in account){
        balance = account[i].balance
    }
    let user = await User.find({_id : req.userId})
    // console.log(user)
    let username = ''
    for (let i in user){
        username = user[i].username
    }
    res.json({'account' : account,'balance' : balance,user : username})
})

router.get('/allUser',authMiddleware,async(req,res)=> {
    let allUsers = await User.find({})
    res.json(allUsers)
})



router.post('/transfer',authMiddleware,async(req,res)=>{
    const amount = req.body.amount;
    const to = req.body.to;
    // const from = req.body.from;
    try{
        let fromUser = await User.findOne({_id : req.userId})
        // console.log(fromUser)
        let senderAccountInfo = await Account.findOne({userId : fromUser._id})
        // console.log(senderAccountInfo)
        if (senderAccountInfo.balance < amount){
            return res.json({msg : 'Insufficent balance'})
        }await Account.updateOne(senderAccountInfo ,{balance : senderAccountInfo.balance-amount})
    }catch{
        return res.json({msg : 'invalid user'})
    }    
    try{
        let toRecipent = await User.findOne({username : to})
        // console.log(toRecipent)
        let recipentAccountInfo = await Account.findOne({userId : toRecipent._id})
        // console.log(recipentAccountInfo)
       await Account.updateOne(recipentAccountInfo,{balance : recipentAccountInfo.balance+amount})
    }catch{
        return res.json({msg : 'Invalid Recipent'})
    }
    res.json({msg : `${amount} is transfered to ${to}`})
})
module.exports = router;