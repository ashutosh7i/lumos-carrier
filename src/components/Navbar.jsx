"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUserData, logout } from "@/app/appwrite";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Component() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData()
      .then((account) => setUser(account))
      .catch((error) => router.push("/login"));
  }, [router]);

  const handleLogOut = () => logout().then(() => router.push("/login"));

  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        <Link
          href="/"
          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="https://github.com/ashutosh7i/lumos-carrier"
          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="https://github.com/ashutosh7i/lumos-carrier"
          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
          prefetch={false}
        >
          Contact
        </Link>
        {/* login/logout item start here */}
        {user ? (
          <Button onClick={handleLogOut}>Logout</Button>
        ) : (
          <Link
            href="/login"
            className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            prefetch={false}
          >
            Login
          </Link>
        )}
        {/* login/logout item end here */}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="https://github.com/ashutosh7i/lumos-carrier"
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="https://github.com/ashutosh7i/lumos-carrier"
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

// ... rest of the code

function MenuIcon() {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon() {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
