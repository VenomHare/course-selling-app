import { prisma } from "@repo/db";
import { LoginInput, SignUpInput } from "@repo/types";
import express, { Router } from "express";
import jwt  from "jsonwebtoken";
import { authMiddleware } from "../../middleware/index.js";
const authRouter : Router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET!
authRouter.post("/signup", async (req, res)=>{
    
    try {
        const parsedData = SignUpInput.safeParse(req.body);
        if (!parsedData.success)
        {
            res.status(403).json({
                message: "Invalid Inputs"
            });
            return;
        }
    
        const {email, name, password} = parsedData.data;
    
        const ExistingUser = await prisma.user.findFirst({
            where: {
                emailId: email
            }
        });
        if (ExistingUser !== null){
            res.status(406).json({
                message: "Email already in use!"
            });
            return;
        }

        const user = await prisma.user.create({
            data: {
                emailId: email,
                name,
                password
            }
        })

        const token = jwt.sign({id: user.id}, JWT_SECRET);

        res.status(200).json({
            message: "User Created Successfully",
            token
        });
        return;
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            message:"Something went wrong"
        })
    }
    
})

authRouter.post("/login", async (req, res) => {
    try {

        const ParsedData = LoginInput.safeParse(req.body);
        if (!ParsedData.success)
        {
            res.status(406).json({
                message: "Invalid Inputs"
            });
            return;
        }

        const {email, password}= ParsedData.data;
        const user = await prisma.user.findUnique({
            where: {
                emailId: email,
                password
            }
        });

        if (user == null)
        {
            res.status(401).json({
                message: "Invalid Email or Password"
            });
            return;
        }

        const token = jwt.sign({id: user.id},JWT_SECRET);

        res.status(200).json({
            token
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Something went wrong"
        })
    }
})

authRouter.get("/whoami", authMiddleware,async (req, res)=>{
    try{
        const userId = req.headers["userId"] as string;
        
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        if (user == null)
        {
            res.sendStatus(403)
        }
        res.status(200).json({
            email: user?.emailId,
            name: user?.name 
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

export default authRouter

