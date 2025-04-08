import { createContext } from "react"

export const AuthState = createContext({
    email: "",
    name: "",
    id: -1
})