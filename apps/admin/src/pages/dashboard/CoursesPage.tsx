import { BACKEND_URL } from "@/App";
import CourseDailog from "@/components/CourseDailog";
import Search from "@/components/Search";
import Topbar from "@/components/Topbar";
import CourseCard from "@/components/ui/CourseCard";
import { Course, CourseDailogState } from "@repo/types";
import axios from "axios";
import { useEffect, useState } from "react";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState("");
  // const filterDebounce = useDebounce(filter, 300);

  const [dailogVisible, setDailogVisible] = useState(false);
  const [activeCourse, setActiveCourse] = useState<Course>(courses[0])
  const [dialogState, setDialogState] = useState<CourseDailogState>("view")


  const fetchData = async () => {
    try {
      const req = await axios.get(
        `${BACKEND_URL}/course?filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("crs_admin_auth")}`,
          },
        }
      );
      setCourses(req.data.courses);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dailogVisible]);

  return (<>
    <CourseDailog
      activeCourse={activeCourse}
      dailogVisible={dailogVisible}
      setDailogVisible={setDailogVisible}
      dialogState={dialogState}
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
            <CourseCard course={c} setDialogState={setDialogState} setActiveCourse={setActiveCourse} setDialogVisible={setDailogVisible} />
          </>
        ))}
      </div>
    </div>
  </>
  );
};

export default CoursesPage;
