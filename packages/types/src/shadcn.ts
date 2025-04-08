export interface LoginProps {
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onNavClicked: () => void,
    FormAction: "Login" | "Signup"
}