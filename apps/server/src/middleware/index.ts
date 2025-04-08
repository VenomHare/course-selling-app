import { prisma } from "@repo/db";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET!;
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token!, JWT_SECRET, async (err, payload) => {
                if (err) {
                    return res.sendStatus(403);
                }
                if (!payload) {
                    return res.sendStatus(403);
                }
                if (typeof payload === "string") {
                    return res.sendStatus(403);
                }
                const user = await prisma.user.findFirst({
                    where: {
                        id: payload.id
                    }
                })

                if (user == null)
                {
                    return res.sendStatus(403);
                }

                req.headers["userId"] = payload.id;
                next();
            });
        }
        else {
            res.status(403).json({
                message: "Unauthorized"
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}


export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const JWT_SECRET = process.env.ADMIN_JWT_SECRET!;

            const token = authHeader.split(" ")[1];
            jwt.verify(token!, JWT_SECRET, async(err, payload) => {
                if (err) {
                    return res.sendStatus(403);
                }
                if (!payload) {
                    return res.sendStatus(403);
                }
                if (typeof payload === "string") {
                    return res.sendStatus(403);
                }

                const admin = await prisma.admin.findUnique({
                    where: {
                        id: payload.id
                    }
                })
                if (!admin){
                    res.sendStatus(403);
                }

                req.headers["adminId"] = admin?.id.toString();
                next();
            });
        }
        else {
            res.status(403).json({
                message: "Unauthorized"
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}