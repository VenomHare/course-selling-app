import { DialogContent } from "./ui/dialog"
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from "./ui/textarea"
import { CreateCourseParams } from "@repo/types"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { BACKEND_URL } from "@/App"
interface Props {
    setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateCourseDail = ({ setDialogVisible }: Props) => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(-1);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const body: CreateCourseParams = {
            title,
            description: desc,
            price
        }
        try {
            await axios.post(`${BACKEND_URL}/course`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("crs_admin_auth")}`
                }
            });
            setDialogVisible(false);
            toast.success("Course Created Successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to Edit Course");
        }
    }

    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Course</DialogTitle>
                        <DialogDescription>Create a new Course</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="courseEditTitle" className="text-xs text-gray-400">Title</Label>
                            <Input id="courseEditTitle" required onChange={(e) => { setTitle(e.target.value) }} />
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="courseEditDesc" className="text-xs text-gray-400">Description</Label>
                            <Textarea id="courseEditDesc" className="max-h-64" required onChange={(e) => { setDesc(e.target.value) }} />
                        </div>
                        <div className="flex flex-col items-start gap-4">
                            <Label htmlFor="courseEditPrice" className="text-xs text-gray-400">Price</Label>
                            <Input id="courseEditPrice" type="number" required onChange={(e) => { setPrice(parseInt(e.target.value)) }} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" variant={"ghost"} >Create</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </>
    )
}

export default CreateCourseDail