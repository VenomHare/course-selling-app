import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import { ThemeProvider } from './components/theme-provider'
import SignupPage from './pages/SignupPage'
import { AuthState } from './store/atoms'
import { useEffect, useState } from 'react'
import axios from "axios"
import { Toaster } from 'sonner'
import DashboardPage from './pages/dashboard/DashboardPage'
import CoursesPage from './pages/dashboard/CoursesPage'
import StudentsPage from './pages/dashboard/StudentsPage'
import OwnedPage from './pages/dashboard/OwnedPage'
import { UserAuth } from '@repo/types'

export const BACKEND_URL = "http://localhost:3010/admin"

function App() {

  const [authObject, setAuthObject] = useState<UserAuth>({
    name: "",
    id: -1,
    email: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("crs_admin_auth");
    const fetchData = async () => {
      try {
        const req = await axios.get(`${BACKEND_URL}/auth/whoami`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAuthObject({
          email: req.data.email,
          name: req.data.name,
          id: req.data.id
        });
        // navigate("/dashboard")
      }
      catch (err) {
        if (!(location.pathname == "/login" || location.pathname == "/signup"))
        {
          window.location.href = ("/login");
        }
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <BrowserRouter>
        <AuthState.Provider value={authObject}>
          <Toaster />
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/dashboard' element={<DashboardPage />} />
              <Route path='/courses' element={<CoursesPage />} />
              <Route path='/students' element={<StudentsPage />} />
              <Route path='/mycourses' element={<OwnedPage />} />
            </Routes>
          </ThemeProvider>
        </AuthState.Provider>
      </BrowserRouter>
    </>
  )
}


export default App
