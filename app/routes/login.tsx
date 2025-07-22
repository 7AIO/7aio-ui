import type { Route } from "./+types/login";
import { Layout } from "~/home/layout";
import { useEffect } from "react";
import { useAuth } from "~/auth/AuthProvider";
import { API_URL } from "~/lib/api";
import { useNavigate, useLocation, Form, NavLink } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export function meta({}: Route.MetaArgs) {
  return [{ title: "7AIO" }, { name: "description", content: "Login to 7AIO" }];
}

/* export default function Login() {
  return (
    <Layout>
      <Welcome />
    </Layout>
  );
} */

function LoginForm() {
  const { login } = useAuth();
  return (
    <main className="flex items-center justify-center pt-4 pb-4 min-h-screen">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0 max-w-2xl mx-auto px-4">
        <Card className="bg-card-gradient border-slate-200 card-glow backdrop-blur-sm w-full max-w-md">
          <CardContent className="p-4">
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to login to your account
                </p>
              </div>

              <div className="space-y-4">
                <Form method="POST" className="space-y-4 mb-4">
                  <Input name="email" type="email" placeholder="Email" />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </Form>
                <div className="after:border-white relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="backdrop-blur-2xl text-white relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <Button
                  className="w-full bg-button-gradient hover:scale-105 transform transition-all duration-200 glow-effect text-lg py-6"
                  size="lg"
                  onClick={login}
                >
                  {/* <NavLink to={API_URL + "api/login/google"}>
                    Login with Google
                  </NavLink> */}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default function Login() {
  const { user, loading, login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    if (!loading && user) {
      const to = (loc.state as any)?.from?.pathname || "/";
      nav(to, { replace: true });
    }
  }, [user, loading]);

  return (
    <Layout>
      <LoginForm />
      {/* <div className="container mx-auto">
        <h1>Login</h1>
        <Button onClick={login} variant="outline" size="lg">
          Login with Google
        </Button>
      </div> */}
    </Layout>
  );
}
