import { prisma } from "@repo/db";
import { LoginInput, SignUpInput } from "@repo/types";
import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { adminAuthMiddleware } from "../../middleware/index.js";
const adminAuthRouter: Router = express.Router();
const JWT_SECRET = process.env.ADMIN_JWT_SECRET!


adminAuthRouter.post("/signup", async (req, res) => {
    try {
        const parsedData = SignUpInput.safeParse(req.body);

        if (!parsedData.success) {
            res.status(403).json({
                message: "Invalid Inputs"
            });
            return;
        }

        const { email, name, password } = parsedData.data;

        const ExistingUser = await prisma.admin.findFirst({
            where: {
                emailId: email
            }
        });
        if (ExistingUser !== null) {
            res.status(406).json({
                message: "Email already in use!"
            });
            return;
        }

        const user = await prisma.admin.create({
            data: {
                emailId: email,
                name,
                password
            }
        })

        const token = jwt.sign({ id: user.id }, JWT_SECRET);

        res.status(200).json({
            token
        });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }

})

adminAuthRouter.post("/login", async (req, res) => {
    try {
        const ParsedData = LoginInput.safeParse(req.body);
        if (!ParsedData.success) {
            res.status(406).json({
                message: "Invalid Inputs"
            });
            return;
        }

        const { email, password } = ParsedData.data;
        const user = await prisma.admin.findUnique({
            where: {
                emailId: email,
                password
            }
        });

        if (user == null) {
            res.status(401).json({
                message: "Invalid Email or Password"
            });
            return;
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET);

        res.status(200).json({
            token
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

adminAuthRouter.get("/whoami", adminAuthMiddleware, async (req, res) => {
    try {
        const adminId = req.headers["adminId"] as string;

        const user = await prisma.admin.findUnique({
            where: {
                id: parseInt(adminId)
            }
        });
        if (user == null) {
            res.sendStatus(403)
        }
        res.status(200).json({
            email: user?.emailId,
            name: user?.name,
            id: user?.id
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

export default adminAuthRouter

