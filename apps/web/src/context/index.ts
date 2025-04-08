import { createContext } from "react";

export const AuthState = createContext({
    id: -1,
    name: "",
    email: "",
})  