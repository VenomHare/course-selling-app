import { Course, UserCourseDialogState } from "@repo/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./context-menu"
import { Eye, IndianRupee } from "lucide-react"
interface Props {
    course: Course,
    userPurchases: number[],
    setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setActiveCourse: React.Dispatch<React.SetStateAction<Course>>,
    setDialogState: React.Dispatch<React.SetStateAction<UserCourseDialogState>>
}
const CourseCard = ({ course, setActiveCourse, setDialogVisible, setDialogState, userPurchases }: Props) => {


    const showDail = (state: UserCourseDialogState) => {
        setActiveCourse(course);
        setDialogState(state);
        setDialogVisible(true);
    }

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger>
                    <Card className="min-w-1/3" key={course.id} onClick={()=>{showDail("view")}}>
                        <CardHeader>
                            <CardTitle>{course.title}</CardTitle>
                            <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Rs. {course.price}</p>
                        </CardContent>
                    </Card>
                </ContextMenuTrigger>

                <ContextMenuContent className="w-32">
                    <ContextMenuItem onClick={() => {
                        showDail("view")
                    }}>
                        <Eye /> View
                    </ContextMenuItem>
                    {
                        !(userPurchases.includes(course.id)) && <>
                            <ContextMenuItem variant={"default"} onClick={() => {
                                showDail("purchase")
                            }}>
                                <IndianRupee /> Purchase
                            </ContextMenuItem>
                        </>
                    }
                </ContextMenuContent>

            </ContextMenu>
        </>
    )
}

export default CourseCard