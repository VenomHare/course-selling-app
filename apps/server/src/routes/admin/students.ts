import { Router } from "express";
import { adminAuthMiddleware } from "../../middleware/index.js";
import { prisma } from "@repo/db";
import { StudentsRecord, User } from "@repo/types";

const studentsRouter : Router = Router();

studentsRouter.get("/", adminAuthMiddleware,async (req, res) => {
    try {
        const adminId = parseInt(req.headers.adminId as string);

        const courseData = await prisma.admin.findMany({
            where: {
                id: adminId
            },
            include: {
                courses : {
                    include: {
                        users: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });
        
        const users : StudentsRecord= {};
        
        courseData[0]?.courses.map(course => {
        
            users[course.id] = course.users.map(coursePur => coursePur.user as User)
            
            // return {
            //     courseId: course.id,
            //     users: course.users.map(coursePur => coursePur.user)
            // }
        })
        console.log(courseData);
        res.status(200).json(users);        
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

export default studentsRouter