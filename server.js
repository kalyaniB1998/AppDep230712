const express = require("express");
const cors =require("cors");
const morgan =require("morgan");
const fs = require("fs");
const path = require("path");
const mongoose =require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let app = express();
app.use(cors());
app.use("/uploads",express.static('uploads'));

app.use(express.static(path.join(__dirname,"./client/build")));

const multer =  require ("multer");
 
let connectToMDB = async()=>{
    try{
    await mongoose.connect("mongodb+srv://kalyaniambhore98:kalyaniambhore98@cluster0.ylzksoz.mongodb.net/PulseDB?retryWrites=true&w=majority");
    console.log("Successfully Connected to MDB");
    }catch(err){
     console.log("Unable to Connect");
 };
};
let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    profilePic:String,
});
let User = new mongoose.model(
    "user",userSchema );
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "uploads");
        },
        filename: function (req, file, cb) {
            console.log(file);
      
          cb(null, `${Date.now()}_${file.originalname}`);
        }
      })
      
      const upload = multer({ storage: storage });


      app.post("/Signup",upload.single("profilePic"), async(req,res)=>{
        console.log("received data");
        console.log(req.body);
        console.log(req.file);
        
        let hashedPassword =await bcrypt.hash(req.body.password,10);
        
       try{
        let newUser = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            email:req.body.email,
            password:hashedPassword,
            profilePic:req.file.path,
        });


        let userData = await User.find().and({email:req.body.email})

        if(userData.length>0){
          res.json({status:"success",msg:"user account already exists"});
         }else{
          await User.insertMany([newUser]);
          console.log("user created Successfully");
          res.json({status:"success",msg:"user created Successfully"});

         }
       }catch(err){ 
        console.log("Unable to insert user into DB");
      console.log(err);
         res.json({status:"failure",msg:"Unable to create user"});
    }
        
    });
    app.post("/validateLogin",upload.none(),async(req,res)=>{
        console.log(req.body);

       let userData = await User.find().and({email:req.body.email})
       if(userData.length> 0){
        let isPassword = await bcrypt.compare(req.body.password,userData[0].password)
        if(isPassword===true){
           
            let encryptedCredentials = jwt.sign({email:userData[0].email,password:userData[0].password},"KGB"
            );
            console.log(encryptedCredentials);

          res.json({status:"success",data:userData,token:encryptedCredentials,});

        }else{
          res.json({status:"failure",msg:"Invalid Password"})
        }
       }else{
      res.json({status:"failure",msg:"invalid Username"})}


    });
    app.post("/validateToken",upload.none(),async(req,res)=>{
      console.log(req.body);
      try{
    
     let derscryptedCredentials = jwt.verify(req.body.token,"KGB");
         console.log(derscryptedCredentials)
     let userDetails =await User.find().and({email:derscryptedCredentials.email})
     
     if(userDetails.length>0){
      if(userDetails[0].password===derscryptedCredentials.password){
        res.json({status:"success",data:userDetails});
      }else{
        res.json({status:"failure",msg:"Invalid password"});
      }
     }else{
      res.json({status:"failure",msg:"Invalid token"});
     }

     
    }catch(err){
      res.json({status:"failure",msg:"Invalid token"})
    }
    
    });
    
    app.patch("/editProfile",upload.single("profilePic"),
    async (req,res)=>{

    try{
    if(req.body.firstName.length>0){
       await User.updateMany({email:req.body.email},{firstName:req.body.firstName,
       });
       }
     if(req.body.lastName.length>0){
       await User.updateMany({email:req.body.email},{lastName:req.body.lastName,
       });
       }
     if(req.body.age.length>0){
       await User.updateMany({email:req.body.email},{age:req.body.age,
       });
       }
     if(req.body.password.length>0){
       await User.updateMany({email:req.body.email},{password:req.body.password,
       });
       } 
     if(req.files.path.length>0){
       await User.updateMany({email:req.body.email},{
         profilePic:req.files.path,
       });
       }  
      req.json({status:"success",msg:"User Details Upadated Successfully"})
        }catch(err){
      console.log(err);
      res.json({status:"failure",msg:"Unable to Update Details"})
    }
    })

     app.delete("/deleteUser",async(req,res)=>{
      try{
      await User.deleteMany({email:req.query.email})
      res.json({status:"success",msg:"User Deleted Successfully"});
    }catch(err){
      console.log(err);
          res.json({status:"failure",msg:"unable to Delete user"});
    }

     })
    app.listen(8899,()=>{
        console.log("listening to port 8899");
    });
    connectToMDB();
