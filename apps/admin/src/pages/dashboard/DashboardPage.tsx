
import { BookOpen, Users, Plus } from 'lucide-react';
import Topbar from "@/components/Topbar";
import { Link } from 'react-router-dom';

const DashboardPage = () => {

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Topbar />
      {/* /Dummy */}
      {/* <div className="w-full h-19 bg-amber-100"></div> */}
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="text-center mb-16 relative">
          <h1 className="text-5xl font-bold">
            <span className="block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-pulse">welcome to</span>
            <span className="block text-6xl mt-2 font-extrabold tracking-tight text-white drop-shadow-lg">
              VxCourses
            </span>
            <span className="block text-5xl mt-2 font-semibold tracking-tight text-white drop-shadow-lg">
              Creator
            </span>

          </h1>
          <div className="h-1 w-32 mx-auto mt-6 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link to="/mycourses?create=1" className="flex flex-col items-center justify-center p-6 bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-slate-200 hover:bg-slate-700 border border-slate-700 hover:scale-105">
            <Plus size={24} className="mb-2 text-indigo-400" />
            <span>Create Course</span>
          </Link>

          <Link to={"/courses"} className="flex flex-col items-center justify-center p-6 bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-slate-200 hover:bg-slate-700 border border-slate-700 hover:scale-105">
            <BookOpen size={24} className="mb-2 text-purple-500" />
            <span>Courses</span>
          </Link>

          <Link to="/students" className="flex flex-col items-center justify-center p-6 bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-slate-200 hover:bg-slate-700 border border-slate-700 hover:scale-105">
            <Users size={24} className="mb-2 text-indigo-400" />
            <span>Students</span>
          </Link>

          <Link to="/mycourses" className="flex flex-col items-center justify-center p-6 bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-slate-200 hover:bg-slate-700 border border-slate-700 hover:scale-105">
            <Users size={24} className="mb-2 text-pink-500" />
            <span>My Courses</span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
