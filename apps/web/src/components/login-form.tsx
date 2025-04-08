import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = LoginFormProps & React.ComponentProps<"form"> 

interface LoginFormProps {
  FormAction: string,
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onNavClicked: () => void,
  onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export function LoginForm({
  className,
  onEmailChange,
  onPasswordChange,
  FormAction,
  onNameChange,
  onNavClicked,
  ...props
}: Props) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold md:text-5xl ">{FormAction} to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to {FormAction.toLowerCase()} to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required onChange={onEmailChange}/>
        </div>
        {
          FormAction == "Signup" && 
          <div className="grid gap-3">
            <Label htmlFor="email">Name</Label>
            <Input id="name" type="text" placeholder="John Doe" required onChange={onNameChange}/>
          </div>
        }
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input id="password" type="password" required onChange={onPasswordChange}/>
        </div>
        <Button type="submit" variant={"outline"} className="w-full text-foreground">
          {FormAction}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          
        </div>
      </div>
      <div className="text-center text-sm">
      {
        FormAction == "Login" ? <>
          Don&apos;t have an account?{" "}
          <a onClick={onNavClicked} className="underline underline-offset-4 cursor-pointer">
            Sign up
          </a>
        </>
        : <>
          Already have an account?{" "}
          <a onClick={onNavClicked} className="underline underline-offset-4 cursor-pointer">
            Log in
          </a>
        </>
      }
      </div>
    </form>
  )
}
