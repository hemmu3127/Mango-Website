const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');// creating token for verification
const multer = require('multer');// image storing system
const path = require('path');
const cors = require('cors'); // provide access to react project

// initialized all dependencies

app.use(express.json());// request passed using json method
app.use(cors()); //get access to react frontend connect with the backend

// react app is connected to express server in 4000

// Database connection with mongodb
mongoose.connect('mongodb+srv://hemmu3127:sowri0710@cluster0.bydvshc.mongodb.net/mango');

// API creation
// to check whether that express server is running
app.get('/',(req,res)=>{
    res.send("Express App is Running")
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage:storage
})

// creating upload endpoint for images

app.use('/images',express.static('upload/images'))

app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// schema for creating products

const Product = mongoose.model('Product',{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})
// store data in our database

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save(); // data is saved in the mongo db
    console.log('Saved')
    res.json({
        success:true,
        name:req.body.name,
    })
})

// creating api for deleting products

app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Removed");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error(error); // Log any errors for debugging
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


const findImages = async(products)=>{
    
    let images = []
    products.map((product)=>{images.push(product.image)})
    let urls = []
    images.map((image)=>{urls.push(image.slice(21))})
    app.get('/images/:imageId', async (req, res) => {
        const imageId = req.params.imageId;
        // Here you might want to verify if the imageId is valid or not
        // For example, check if it exists in your list of image URLs

        // If imageId is valid, you might want to send the corresponding image
        // For now, I'll just send back the imageId
        let url = "/images/"+imageId
        res.send(url);
    });
} 
// creating api for getting all products
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    findImages(products)
    console.log("All products Fetched");
    res.send(products);
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
    cartData:{
        type:Object,
    },
    date:
    {
        type:Date,
        default:Date.now,
    }
})

// creating endpoint for registering the user


const cookieParser = require('cookie-parser');
app.use(cookieParser());

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


// creating endpoint for new collection data
app.get('/newcollection',async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send( newcollection );
})

// creating endpoint for popular in south
app.get('/south',async (req,res)=>{
    let products = await Product.find({category:"south"});
    let newcollection = products.slice(0,4);
    console.log("South Collection Fetched");
    res.send( newcollection );
})

// creating middleware to fetch user
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"please authenticate using valid token"})
        }
    }
}

// creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser, async(req,res)=>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("added to cart")
})

// creating endpoint for removing products from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("remove",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("removed from cart")
})

// creatin endpoint for displaying products in cartdata

app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("get cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error){
        console.log('Server is running on port 4000');
    }
    else{
        console.log('error: '+error);
    }
});
