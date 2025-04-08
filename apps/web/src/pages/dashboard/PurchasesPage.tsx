import { BACKEND_URL } from "@/App";
import CourseDailog from "@/components/CourseDail";
import Topbar from "@/components/Topbar";
import CourseCard from "@/components/ui/CourseCard";
import { Course, UserCourseDialogState, } from "@repo/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PurchasePage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [dailogVisible, setDailogVisible] = useState(false);
    const [activeCourse, setActiveCourse] = useState<Course>(courses[0])
    const [dialogState, setDialogState] = useState<UserCourseDialogState>("view")
    const [purchasedId, setPurchasedId] = useState<number[]>([])


    const fetchData = async () => {
        try {
            const req = await axios.get(`${BACKEND_URL}/course/purchased`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("crs_user_auth")}`,
                },
            });

            setCourses(req.data.courses);
            setActiveCourse(req.data.courses[0]);
        } catch (err) {
            toast.warning("Something went wrong");
        }
    };

    useEffect(() => {
        fetchData();
    }, [dailogVisible]);
    
    useEffect(()=>{
        setPurchasedId(courses.map(i=>i.id));
    },[courses])

    return (<>
        <CourseDailog
            activeCourse={activeCourse}
            dailogVisible={dailogVisible}
            setDailogVisible={setDailogVisible}
            dialogState={dialogState}
            setDialogState={setDialogState}
            purchases={purchasedId}
        />

        <div className="w-screen h-screen flex flex-col items-center">
            <Topbar />
            {
                courses.length <= 0 ? <>

                    <div className="flex justify-center items-center text-3xl font-semibold my-5">No Purchases Yet!</div>

                </> : <>
                    <div className="w-[95%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {courses.map((c) => (
                            <CourseCard course={c} userPurchases={purchasedId} setActiveCourse={setActiveCourse} setDialogVisible={setDailogVisible} setDialogState={setDialogState} />
                        ))}
                    </div>
                </>
            }
        </div>
    </>
    );
};

export default PurchasePage;
