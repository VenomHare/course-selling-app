import { BACKEND_URL } from "@/App";
import CourseDailog from "@/components/CourseDailog";
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";

import CourseCard from "@/components/ui/CourseCard";
import { Course, CourseDailogState,  } from "@repo/types";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const OwnedPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [dailogVisible, setDailogVisible] = useState(false);
  const [activeCourse, setActiveCourse] = useState<Course>(courses[0])
  const [dialogState, setDialogState] = useState<CourseDailogState>("view")
  
  const [query, setQuery] = useSearchParams();
  
  useEffect(()=>{
    const create = query.get("create");
    if (create !== null)
    {
      setDialogState("create");
      setDailogVisible(true);
    }
  },[query])

  const fetchData = async () => {
    try {
      const req = await axios.get(`${BACKEND_URL}/course`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("crs_admin_auth")}`,
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

  return (<>
    <CourseDailog 
      activeCourse={activeCourse} 
      dailogVisible={dailogVisible} 
      setDailogVisible={setDailogVisible}
      dialogState={dialogState}
    />
    
    <div className="w-screen h-screen flex flex-col items-center">
      <Topbar />
      <Button variant={"ghost"} className="w-[95%] mt-2 mb-4" onClick={()=>{
        setQuery("create=1")
      }}> <Plus/> Create New Course</Button>
      <div className="w-[95%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {courses.map((c) => (
          <CourseCard course={c} setActiveCourse={setActiveCourse} setDialogVisible={setDailogVisible} setDialogState={setDialogState} />
        ))}
      </div>
    </div>
  </>
  );
};

export default OwnedPage;
