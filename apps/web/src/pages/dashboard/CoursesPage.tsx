import { BACKEND_URL } from "@/App";
import CourseDailog from "@/components/CourseDail";
import Search from "@/components/Search";
import Topbar from "@/components/Topbar";
import CourseCard from "@/components/ui/CourseCard";
import { Course, UserCourseDialogState } from "@repo/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [filter, setFilter] = useState("");
    const [purchases, setPurchases] = useState<number[]>([]);
    // const filterDebounce = useDebounce(filter, 300);

    const [dailogVisible, setDailogVisible] = useState(false);
    const [activeCourse, setActiveCourse] = useState<Course>(courses[0])
    const [dialogState, setDialogState] = useState<UserCourseDialogState>("view")

    const fetchData = async () => {
        try {
            const req = await axios.get(
                `${BACKEND_URL}/course?filter=${filter.trim()}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("crs_user_auth")}`,
                    },
                }
            );

            setCourses(req.data.courses);
            setActiveCourse(req.data.courses[0]);

            const purchasesReq = await axios.get(`${BACKEND_URL}/course/purchased`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("crs_user_auth")}`,
                },
            });
            const courses: Course[] = purchasesReq.data.courses
            setPurchases(courses.map(e => e.id));

        } catch (err) {
            toast.warning("Something went wrong");
        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    return (<>
        <CourseDailog
            activeCourse={activeCourse}
            dailogVisible={dailogVisible}
            setDailogVisible={setDailogVisible}
            dialogState={dialogState}
            setDialogState={setDialogState}
            purchases={purchases}
        />
        <div className="w-screen h-screen flex flex-col items-center ">
            <Topbar />
            <Search
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    fetchData();
                }}
            />

            <div className="w-[95%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {courses.map((c) => (
                    <>
                        <CourseCard course={c} userPurchases={purchases} setDialogState={setDialogState} setActiveCourse={setActiveCourse} setDialogVisible={setDailogVisible} />
                    </>
                ))}
            </div>
        </div>
    </>
    );
};

export default CoursesPage;
