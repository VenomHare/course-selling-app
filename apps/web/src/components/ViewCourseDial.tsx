import { DialogContent, DialogFooter } from "./ui/dialog"
import { DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Course, UserCourseDialogState } from "@repo/types"
import { useEffect, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from "./ui/button"
interface Props {
    course: Course,
    purchases: number[],
    setDialogState: React.Dispatch<React.SetStateAction<UserCourseDialogState>>
}

const ViewCourseDail = ({ course, purchases, setDialogState }: Props) => {
    const [formattedPrice, setFormattedPrice] = useState("");
    
    useEffect(()=>{
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "INR",
          }).format(course?.price)
        setFormattedPrice(formatted);
    },[course])
    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                {
                    course ?
                        <>
                            <VisuallyHidden>
                                <DialogHeader>
                                    <DialogTitle>View Course</DialogTitle>
                                </DialogHeader>
                            </VisuallyHidden>
                            <div className="grid gap-4 py-4">
                                <div className="flex flex-col items-start gap-4">
                                    <Label className="text-xs text-gray-400">Title</Label>
                                    {course?.title}
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <Label className="text-xs text-gray-400">Description</Label>
                                    <ScrollArea className="max-h-64">
                                        {course.description}
                                    </ScrollArea>
                                </div>
                                <div className="flex flex-col items-start gap-4">
                                    <Label className="text-xs text-gray-400">Price</Label>
                                    {formattedPrice}
                                </div>
                            </div>
                            <DialogFooter>
                                {
                                    purchases?.includes(course.id) ? 
                                        <Button disabled>Purchased</Button> 
                                    : 
                                        <Button onClick={()=>{setDialogState("purchase")}}>Purchase</Button>
                                }
                            </DialogFooter>
                        </>
                        :
                        <div>
                            Loading
                        </div>
                }
            </DialogContent>
        </>
    )
}

export default ViewCourseDail