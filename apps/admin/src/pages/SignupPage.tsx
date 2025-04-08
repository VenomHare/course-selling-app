import { BACKEND_URL } from "@/App";
import { LoginForm } from "@/components/login-form";
import { SignUpParams } from "@repo/types";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen overflow-clip flex items-center justify-center">
      <div className="w-9/12 md:w-2/3 lg:w-2/4 xl:w-1/4 shadow shadow-amber-50/50 p-10 rounded-2xl">
        <LoginForm
          FormAction="Signup"
          onEmailChange={(e) => {
            setEmail(e.target.value);
          }}
          onPasswordChange={(e) => {
            setPassword(e.target.value);
          }}
          onNavClicked={() => {
            navigate("/login");
          }}
          onNameChange={(e) => {
            setName(e.target.value);
          }}
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const signUpBody: SignUpParams = {
                email,
                password,
                name,
              };
              const login = await axios.post(
                `${BACKEND_URL}/auth/signup`,
                signUpBody
              );
              localStorage.setItem("crs_auth_token", login.data.token);
              navigate("/dashboard");
            } catch (err) {
              toast.warning("Invalid Username or Password");
            }
          }}
        />
      </div>
    </div>
  );
};

export default SignupPage;
