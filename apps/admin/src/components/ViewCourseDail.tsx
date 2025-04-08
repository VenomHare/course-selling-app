import { DialogContent } from "./ui/dialog"
import { DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Course } from "@repo/types"
import { useEffect, useState } from "react"
import { ScrollArea } from "./ui/scroll-area"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
interface Props {
    course: Course
}

const ViewCourseDail = ({ course }: Props) => {
    const [formattedPrice, setFormattedPrice] = useState("");

    useEffect(() => {
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "INR",
        }).format(course?.price)
        setFormattedPrice(formatted);
    }, [course])
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