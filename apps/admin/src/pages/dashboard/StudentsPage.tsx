import { BACKEND_URL } from '@/App'
import { tableUser } from '@/components/students/columns'
import {  DataTableDemo } from '@/components/students/data-table'
import Topbar from '@/components/Topbar'
import { Course, User } from '@repo/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const StudentsPage = () => {

  const [students, setStudents] = useState<tableUser[]>()

  const fetchData = async () => {
    try {
      const courseReq = await axios.get(`${BACKEND_URL}/course`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("crs_admin_auth")}`,
        },
      });

      const studentsReq = await axios.get(`${BACKEND_URL}/students`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("crs_admin_auth")}`,
        },
      });
      
      const studentRep: tableUser[] = []
      for (const [key, value] of Object.entries(studentsReq.data)) {
        const data =courseReq.data.courses.find((c: Course) => c.id == parseInt(key));
        (value as User[]).forEach(e => {
          studentRep.push({
            id: e.id,
            emailId: e.emailId,
            name: e.name,
            courseName: data?.title,
            createdAt: e.createdAt
          })
        });
      }
      setStudents(studentRep);
    }
    catch (err) {
      console.log(err);
      toast.warning("Something went wrong");
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='w-screen h-screen flex flex-col items-center'>
      <Topbar />
      <div className="container  mx-auto py-10">
        {
          students ?
            <DataTableDemo data={students!}/>
            :
            <div>Loading</div>
        }
        {/* {JSON.stringify(students)} */}
      </div>
    </div>
  )
}

export default StudentsPage