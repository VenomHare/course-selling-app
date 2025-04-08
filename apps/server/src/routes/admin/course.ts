import { CreateCourseInput, DeleteCourseInput, EditCourseInput } from "@repo/types";
import { Router } from "express";
import { adminAuthMiddleware } from "../../middleware/index.js";
import { prisma } from "@repo/db";

const adminCourseRouter: Router = Router();

adminCourseRouter.post("/", adminAuthMiddleware, async (req, res) => {
    try {
        const parsedData = CreateCourseInput.safeParse(req.body);
        if (!parsedData.success) {
            res.status(406).json({
                message: "Invalid Input"
            });
            return;
        }

        const adminId = req.headers.adminId as string;
        const { title, description, price } = parsedData.data;

        const course = await prisma.course.create({
            data: {
                adminId: parseInt(adminId),
                title,
                description,
                price
            }
        });

        res.status(200).json({
            courseId: course.id,
            message: "Course Created"
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

adminCourseRouter.put("/", async (req, res) => {
    try {
        const parsedData = EditCourseInput.safeParse(req.body);

        if (!parsedData.success) {
            res.status(406).json({
                message: "Invalid Inputs"
            });
            return
        }

        const { courseId, title, description, price } = parsedData.data;

        await prisma.course.update({
            where: {
                id: courseId
            },
            data: {
                title,
                description,
                price
            }
        })

        res.status(200).json({
            message: `Course id ${courseId} Edited`
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

adminCourseRouter.delete("/:courseId", adminAuthMiddleware, async (req, res) => {
    try {
       
        const adminId = parseInt(req.headers.adminId as string)
        const  courseId = parseInt(req.params.courseId as string);
        const courseData = await prisma.course.findUnique({where:{id: courseId}});
        if (courseData?.adminId !== adminId)
        {
            res.status(403).json({
                message: "Unauthorized"
            });
            return;
        }
        await prisma.coursePurchased.deleteMany({
            where :{
                courseId 
            }
        });
        await prisma.course.delete({
            where: {
                id: courseId
            }
        })

        res.status(200).json({
            message: "Course Deleted!"
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})
adminCourseRouter.get("/", adminAuthMiddleware, async (req, res) => {
    try
    {
        const filter  = req.query.filter as string || ""
        const courses = await prisma.course.findMany({
            where:{
                OR:[
                    {
                        title: {
                            contains: filter,
                            mode: "insensitive"
                        }
                    },
                    {
                        description: {
                            contains: filter,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        });
        res.status(200).json({
            courses
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
adminCourseRouter.get("/owned", adminAuthMiddleware, async (req, res) => {
    try {
        const adminId = parseInt(req.headers.adminId as string)
        const courses = await prisma.admin.findFirst({
            where: {
                id:  adminId
            },
            include: {
                courses: true
            }
        })


        res.status(200).json({
            courses: courses?.courses
        });
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})
export default adminCourseRouter