import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { Button } from "./ui/button";

export function Navigation({ currentPage = "home", ...props }) {
  const location = useLocation();
  console.log(location);

  return (
    <nav className="flex justify-between items-center align-middle h-16 px-4 py-2 w-full">
      <NavigationMenu>
        <div className="h-12 text-center flex items-center mr-8">
          <span className="text-2xl font-bold gradient-text font-[Orbitron]">
            7AIO
          </span>
        </div>
        <NavigationMenuList className="transition-all duration-500">
          {links.map((l,i)=> (
            <NavigationMenuItem
              key={i}
              className={location.pathname === l.href ? "link-active" : ""}
            >
              <NavigationMenuLink asChild>
                <Link to={l.href}>{l.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      {props.authenticated ? (
        <Avatar className="ml-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Button variant="outline" asChild>
          <Link to="/login">Login</Link>
        </Button>
      )}
    </nav>
  );
}

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Learn AI",
    href: "/learn",
  },
  {
    name: "Community",
    href: "/community",
  },
  {
    name: "Miners",
    href: "/miners",
  },
];
