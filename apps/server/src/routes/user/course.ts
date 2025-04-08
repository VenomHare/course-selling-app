import { Router } from "express"
import { authMiddleware } from "../../middleware/index.js";
import { prisma } from "@repo/db";

const courseRouter : Router = Router();

courseRouter.get("/", authMiddleware, async (req, res)=>{
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

courseRouter.get("/:courseId/purchase", authMiddleware, async (req, res)=>{
    try
    {
        const courseId = parseInt(req.params.courseId as string);
        const userId = parseInt(req.headers.userId as string);

        const courseData =  await prisma.course.findUnique({
            where: {
                id: courseId
            }
        })

        if (courseData == null)
        {
            res.status(406).json({
                message: "Course Not Found"
            });
            return;
        }

        await prisma.coursePurchased.create({
            data: {
                courseId,
                userId
            }
        })
        
        res.status(200).json({
            message: `Purchased Course ${courseId}`
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

courseRouter.get("/purchased",authMiddleware, async (req, res) => {
    try {
        const userId = parseInt(req.headers.userId as string);

        const data = await prisma.coursePurchased.findMany({
            where: {
                userId
            },
            include: {
                course: true
            }
        })

        res.status(200).json({
            courses: data.map(c=>c.course)
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

export default courseRouter