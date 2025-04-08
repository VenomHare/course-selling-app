import express from 'express'
import cors from "cors"
import authRouter from './routes/user/auth.js';
import dotenv from "dotenv"
import adminAuthRouter from './routes/admin/auth.js';
import courseRouter from './routes/user/course.js';
import adminCourseRouter from './routes/admin/course.js';
import studentsRouter from './routes/admin/students.js';
dotenv.config();

const app = express();
const PORT = 3010;

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log([req.method, req.url, JSON.stringify(req.body)].join(" "));
    next();
})

app.use("/auth", authRouter);
app.use("/admin/auth", adminAuthRouter);
app.use("/course", courseRouter);
app.use("/admin/course", adminCourseRouter);
app.use("/admin/students", studentsRouter);

app.use((req, res, next)=>{
    res.status(500).json({
        message:"Invalid Request URL"
    })
})
app.listen(PORT, ()=>{
    console.log(`Server Running on Port ${PORT}`);
})
