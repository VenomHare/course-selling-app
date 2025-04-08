import { DialogContent } from "./ui/dialog"
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Course } from "@repo/types"
import { useEffect, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { toast } from "sonner"
import axios from "axios"
import { BACKEND_URL } from "@/App"
interface Props {
    course: Course,
    setDialogVisible : React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteCourseDail = ({ course, setDialogVisible }: Props) => {
    const [deleteInp, setdeleteInp] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (deleteInp.toLowerCase() == "delete")
        {
            try {
                await axios.delete(`${BACKEND_URL}/course/${course.id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("crs_admin_auth")}`
                    }
                });
                setDialogVisible(false);
                toast.success("Course Deleted Successfully!");
            } catch (error) {
                toast.error("Failed to Delete Course");
            }
        }
        else{
            toast.warning("Type 'delete' in input box to delete");
        }
    }
    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                {
                    course ?
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle>Delete Course</DialogTitle>
                                <DialogDescription>Are you sure you want to permanently delete the Course?</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">

                                <div className="flex items-center gap-4 rounded border border-slate-600 p-2 bg-slate-900">
                                    <Label className="text-xs text-gray-400 ">Course Id</Label>
                                    {course?.id}
                                </div>
                                <div className="flex items-center gap-4 rounded border border-slate-600 p-2 bg-slate-900 ">
                                    <Label className="text-xs text-gray-400">Title</Label>
                                    {course?.title}
                                </div>

                                <div className="flex flex-col items-start gap-4 mt-2">
                                    <Label htmlFor="deleteInp">Type <span className="rounded border border-slate-600 p-1 bg-slate-900">delete</span> to Delete course.</Label>
                                    <Input id="deleteInp" onChange={(e)=>{setdeleteInp(e.target.value)}} required/>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant='destructive' type="submit">Delete</Button>
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

export default DeleteCourseDail