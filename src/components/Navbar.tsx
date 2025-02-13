import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ThemeToggler from "./ThemeToggler";
import { getServerAuthSession } from "~/server/auth";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className="flex justify-between bg-primary px-5 py-2 text-white dark:bg-slate-700">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Admin Dashboard Logo"
          width={40}
          height={40}
        />
      </Link>

      <div className="flex items-center">
        <ThemeToggler />
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar>
                {session.user?.image ? (
                  <AvatarImage src={session.user.image} alt="Profile Picture" />
                ) : (
                  <AvatarFallback>
                    {getInitials(session.user.name!)}
                  </AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/api/auth/signout">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
      </div>
    </div>
  );
}

function getInitials(name: string) {
  const [firstName, lastName] = name.split(" ");
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName?.charAt(0)}`;
  }
  return name.charAt(0);
}
