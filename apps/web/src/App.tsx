
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthState } from './context'
import { useEffect, useState } from 'react';
import { UserAuth } from '@repo/types';
import axios from 'axios';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import CoursesPage from './pages/dashboard/CoursesPage';
import PurchasePage from './pages/dashboard/PurchasesPage';

export const BACKEND_URL = "http://localhost:3010"


function App() {

  const [authObject, setAuthObject] = useState<UserAuth>({
    name: "",
    id: -1,
    email: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("crs_user_auth");
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
        if (!(location.pathname == "/login" || location.pathname== "/signup"))
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
              <Route path='/purchased' element={<PurchasePage/>} />
            </Routes>
          </ThemeProvider>
        </AuthState.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
