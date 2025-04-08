import { DialogContent } from "./ui/dialog"
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from "./ui/textarea"
import { Course, EditCourseParams } from "@repo/types"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { BACKEND_URL } from "@/App"
interface Props {
    course: Course
    setDialogVisible : React.Dispatch<React.SetStateAction<boolean>>
}

const EditCourseDail = ({ course, setDialogVisible }: Props) => {
    
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(-1);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const body : EditCourseParams = {
            courseId: course.id,
            title,
            description: desc,
            price
        }
        try {
            await axios.put(`${BACKEND_URL}/course`,body,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("crs_admin_auth")}`
                }
            });
            setDialogVisible(false);
            toast.success("Course Edited Successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to Edit Course");
        }
    }
    useEffect(()=>{
        setTitle(course?.title);
        setDesc(course?.description);
        setPrice(course?.price);
    },[course])

    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                {
                    course ?
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle>Edit Course</DialogTitle>
                                <DialogDescription>Change the content of your Course</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="flex flex-col items-start gap-4">
                                    <Label htmlFor="courseEditTitle" className="text-xs text-gray-400">Title</Label>
                                    <Input id="courseEditTitle" defaultValue={course?.title} required onChange={(e)=>{setTitle(e.target.value)}}/>
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <Label htmlFor="courseEditDesc" className="text-xs text-gray-400">Description</Label>
                                    <Textarea id="courseEditDesc" className="max-h-64" defaultValue={course.description} required onChange={(e)=>{setDesc(e.target.value)}}/>
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <Label htmlFor="courseEditPrice" className="text-xs text-gray-400">Price</Label>
                                    <Input id="courseEditPrice" defaultValue={course?.price} type="number" required onChange={(e)=>{setPrice(parseInt(e.target.value))}}/>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" variant={"ghost"} >Confirm</Button>
                            </DialogFooter>
                        </form>
                        :
                        <div>
                            Loading
                        </div>
                }
            </DialogContent>
        </>
    )
}

export default EditCourseDail