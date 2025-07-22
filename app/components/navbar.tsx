import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { Button } from "./ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useAuth } from "~/auth/AuthProvider";

export function Navbar({ currentPage = "home", ...props }) {
  const { user, login, logout } = useAuth();
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const menus = [
    { title: "Home", path: "/" },
    { title: "Learn AI", path: "/learn" },
    { title: "Community", path: "/community" },
    { title: "Miners", path: "/miners" },
  ];

  return (
    <header className="w-full px-4 py-3 border-b border-secondary-foreground bg-transparent">
      <div className="flex items-center justify-between">
        <Link to="/" className="">
          <div className="h-12 text-center flex items-center mr-8">
            <span className="text-2xl font-bold gradient-text font-[Orbitron]">
              7AIO
            </span>
          </div>
        </Link>
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-md hover:bg-accent-foreground/10 transition-colors"
                aria-label="Open navigation menu"
                onClick={() => {
                  console.log("Nav button is pressed, state: ", isNavOpen);
                  setIsNavOpen(!isNavOpen);
                }}
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[75%] p-0"
              closeButton={true}
            >
              <nav className="flex flex-col h-full bg-background">
                <SheetHeader className="flex justify-between items-center p-6 border-b">
                  <SheetTitle className="" asChild>
                    <span className="text-2xl font-bold gradient-text font-[Orbitron]">
                      7AIO
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 py-6">
                  <ul className="space-y-1">
                    {menus.map((item, idx) => (
                      <li key={idx}>
                        <Link
                          to={item.path}
                          className={`flex items-center px-6 py-3 transition-colors ${
                            location.pathname === item.path
                              ? "bg-accent text-white font-medium"
                              : "text-foreground/60 hover:bg-accent/50 hover:text-white"
                          }`}
                          onClick={() => setIsNavOpen(false)}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t p-6">
                  {props.authenticated ? (
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={user?.picture || "https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user?.name || "User Name"}</span>
                        <span className="text-xs text-foreground/60">
                          {user?.email || "user@example.com"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <Button className="w-full" variant="default" onClick={login}>
                      {/* <Link to={"/login"}>
                      </Link> */}
                      Login
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <nav className="hidden md:flex md:grow">
          <div className="flex justify-between space-x-8 w-full">
            <NavigationMenu className="">
              <NavigationMenuList className="transition-all duration-500">
                {menus.map((l, i) => (
                  <NavigationMenuItem
                    key={i}
                    className={
                      location.pathname === l.path ? "link-active" : ""
                    }
                  >
                    <NavigationMenuLink asChild>
                      <Link to={l.path}>{l.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            {props.authenticated ? (
              <Avatar className="ml-8">
                <AvatarImage src={user?.picture || "https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <Button className="border-primary" variant="default" onClick={login}>
                {/* <Link to={"/login"}>
                </Link> */}
                Login
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
