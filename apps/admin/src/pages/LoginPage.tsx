import { BACKEND_URL } from '@/App';
import { LoginForm } from '@/components/login-form';
import { LoginParams } from '@repo/types';
import axios  from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();

    return (
        <div className='w-screen h-screen overflow-clip flex items-center justify-center'>
            <div className='w-9/12 md:w-2/3 lg:w-2/4 xl:w-1/4 shadow shadow-amber-50/50 p-10 rounded-2xl'>
                <LoginForm
                    FormAction='Login'
                    onEmailChange={(e)=>{setEmail(e.target.value)}}
                    onPasswordChange={(e)=>{setPassword(e.target.value)}}
                    onNavClicked={()=>{navigate("/signup")}}
                    onSubmit={async (e)=>{
                        e.preventDefault();
                        try{
                            const loginBody : LoginParams = {
                                email,
                                password,
                            }
                            const login = await axios.post(`${BACKEND_URL}/auth/login`, loginBody);
                            localStorage.setItem("crs_admin_auth", login.data.token);
                            navigate("/dashboard");
                        }
                        catch
                        {
                            toast.warning("Invalid Username or Password");
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default LoginPage