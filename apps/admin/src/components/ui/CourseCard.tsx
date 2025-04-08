import { Course, CourseDailogState } from "@repo/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./context-menu"
import { Eye, SquarePen, Trash2 } from "lucide-react"
import { AuthState } from "@/store/atoms"
import { useContext } from "react"
interface Props {
    course: Course,
    setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setActiveCourse: React.Dispatch<React.SetStateAction<Course>>,
    setDialogState: React.Dispatch<React.SetStateAction<CourseDailogState>>
}
const CourseCard = ({ course, setActiveCourse, setDialogVisible, setDialogState }: Props) => {

    const authState = useContext(AuthState);

    const showDail = (state: CourseDailogState) => {
        setActiveCourse(course);
        setDialogState(state);
        setDialogVisible(true);
    }

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger>
                    <Card className="min-w-1/3" key={course.id}>
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
                        authState.id == course.adminId && <>
                            <ContextMenuItem onClick={() => {
                                showDail("edit")
                            }}>
                                <SquarePen /> Edit
                            </ContextMenuItem>
                            <ContextMenuItem variant="destructive" onClick={()=>{
                                showDail("delete")
                            }}>
                                <Trash2 /> Delete
                            </ContextMenuItem>
                        </>
                    }
                </ContextMenuContent>

            </ContextMenu>
        </>
    )
}

export default CourseCard