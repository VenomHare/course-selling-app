import { z } from "zod";

export const SignUpInput = z.object({
    email: z.string().email("Unique Email is required").min(1),
    name: z.string().min(1),
    password: z.string(),
})

export type SignUpParams = z.infer<typeof SignUpInput>;

export const LoginInput = z.object({
    email: z.string().email(),
    password: z.string()
})

export type LoginParams = z.infer<typeof LoginInput>;

export const CreateCourseInput = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number()
})

export type CreateCourseParams = z.infer<typeof CreateCourseInput>

export const EditCourseInput = z.object({
    courseId: z.number(),
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional()
})

export type EditCourseParams = z.infer<typeof EditCourseInput>

export const DeleteCourseInput = z.object({
    courseId: z.number()
})

export type DeleteCourseParams = z.infer<typeof DeleteCourseInput>;



// Frontend
export interface Course {
    title: string,
    description: string,
    price: number,
    id: number,
    adminId: number
}

export interface User {
    id: number,
    name: string,
    emailId: string,
    createdAt: Date
}

export type StudentsRecord = Record<number, User[]>

export interface UserAuth {
    id: number,
    name: string,
    email: string,
}

export type CourseDailogState = "view" | "edit" | "delete" | "create";
export type UserCourseDialogState = "view" | "purchase" | "done";

