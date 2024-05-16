const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');// creating token for verification
const path = require('path');

app.use(express.json());
mongoose.connect('mongodb+srv://hemmu3127:sowri0710@cluster0.bydvshc.mongodb.net/mango');

app.get('/',(req,res)=>{
    res.send("Express App is Running")
})

// schema creation for user model
const Users = mongoose.model('Users',{
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    date:
    {
        type:Date,
        default:Date.now,
    }
})

app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: 'existing user found with same email' });
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
        });

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, 'secret_ecom');

        // Setting the token as a cookie
        res.cookie('authToken', token, { maxAge: 900000, httpOnly: true }); // Expires in 15 minutes

        // Sending token and cookie in response
        res.json({ success: true, token, message:'Cookie Stored'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, errors: 'Internal server error' });
    }
});


app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data ={
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"User not found"});
    }
})


app.listen(port,(error)=>{
    if(!error){
        console.log('Server is running on port 4000');
    }
    else{
        console.log('error: '+error);
    }
});