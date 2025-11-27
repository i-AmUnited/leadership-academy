import { Label } from "../components/ui/label";
import Button from "../components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Lock } from "lucide-react";

const SignIn = () => {
    return (
      <div className="flex items-center justify-center gap-20">
        <Card className="w-full max-w-sm">
          <CardHeader className="grid gap-1">
            <Lock className="size-4 mb-2"/>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription className="text-xs">
              <span>
                This page is restricted. Only proceed if you are authorized.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex gap-5">
            <Button
              buttonText={"Sign in"}
              background={"bg-brandLightBlue"}
              textColor={"text-white"}
              destination={"/manage-tlao/dashboard"}
            />
          </CardFooter>
        </Card>
      </div>
    );
}
 
export default SignIn;