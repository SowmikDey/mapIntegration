import prisma from '../db/db.config.js';
import bcrypt from 'bcryptjs';
import env from 'dotenv'
import jwt from "jsonwebtoken";
import { generateTokenAndSetCookie } from '../lib/util/generateToken.js';


env.config();

export const signup = async (req,res) => {
 try {
  const {name,email,password} = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    return res.status(400).json({error:"Invalid email format"})
  }  


  const existingEmail = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

 
  if(existingEmail){
    return res.status(400).json({error: "Email already been used"})
  }

  if(password.length <6){
    return res.status(400).json({error: "Password must be atleast 6 digits"});
  }
  //hasing
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,saltRounds);

  const newUser = await prisma.user.create({
    data:{
      name: name,
      email: email,
      password: hashedPassword,
    }
  })

if(newUser){
  generateTokenAndSetCookie(newUser.id,res)

  res.status(201).json({
    id: newUser.id,
   name: newUser.name,
    email: newUser.email,
  })
}
else{
  res.status(400).json({error:"Invalid user data"});
}

 } catch (error) {
  res.status(500).json({error:"Couldn't make new User"});
  console.error(error.message);
 }
}

export const login = async (req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email : email
      }
    })
    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if(!user || !isPasswordCorrect){
      return res.status(500).json({error: "Invalid username or password"});
    }

    generateTokenAndSetCookie(user.id,res);

    const token = jwt.sign({userId:user.id},process.env.JWT_SECRET,{
        expiresIn: '15d'
      })

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });


  } catch (error) {
    console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
  }
 }

 export const logout = async (req,res)=>{

 try {
  res.cookie("jwt","",{maxAge:0});
 res.status(200).json({message:"Logged out successfully"});
 } catch (error) {
  console.log("Error in logout",error.message);
  res.status(500).json({error:"Internal Server Error"});
 }
 }


 export const getMe = async (req,res) => {
  try {
    const user = await prisma.user.findUnique({
      where:{
        id : req.user.id
      },
      select:{
        id: true,
				name: true,
				email: true,
      }
    });
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in geeting User",error.message);
    res.status(500).json({error:"Internal Server Error"});
  }
 }