// "use client";

// import { useState } from "react";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// import { GitHubLogoIcon } from "@radix-ui/react-icons";
// import { buttonVariants } from "./ui/button";
// import { Menu } from "lucide-react";
// import { ModeToggle } from "./mode-toggle";
// import { LogoIcon } from "./Icons";

// interface RouteProps {
//   href: string;
//   label: string;
// }

// const routeList: RouteProps[] = [
//   {
//     href: "#features",
//     label: "Features",
//   },
//   {
//     href: "#testimonials",
//     label: "Testimonials",
//   },
//   {
//     href: "#pricing",
//     label: "Pricing",
//   },
//   {
//     href: "#faq",
//     label: "FAQ",
//   },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   return (
//     <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
//       <NavigationMenu className="mx-auto">
//         <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
//           <NavigationMenuItem className="font-bold flex">
//             <a
//               rel="noreferrer noopener"
//               href="/"
//               className="ml-2 font-bold text-xl flex"
//             >
//               <LogoIcon />
//               ShadcnUI/React
//             </a>
//           </NavigationMenuItem>

//           {/* mobile */}
//           <span className="flex md:hidden">
//             <ModeToggle />

//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger className="px-2">
//                 <Menu
//                   className="flex md:hidden h-5 w-5"
//                   onClick={() => setIsOpen(true)}
//                 >
//                   <span className="sr-only">Menu Icon</span>
//                 </Menu>
//               </SheetTrigger>

//               <SheetContent side={"left"}>
//                 <SheetHeader>
//                   <SheetTitle className="font-bold text-xl">
//                     Shadcn/React
//                   </SheetTitle>
//                 </SheetHeader>
//                 <nav className="flex flex-col justify-center items-center gap-2 mt-4">
//                   {routeList.map(({ href, label }: RouteProps) => (
//                     <a
//                       rel="noreferrer noopener"
//                       key={label}
//                       href={href}
//                       onClick={() => setIsOpen(false)}
//                       className={buttonVariants({ variant: "ghost" })}
//                     >
//                       {label}
//                     </a>
//                   ))}
//                   <a
//                     rel="noreferrer noopener"
//                     href="https://github.com/leoMirandaa/shadcn-landing-page.git"
//                     target="_blank"
//                     className={`w-[110px] border ${buttonVariants({
//                       variant: "secondary",
//                     })}`}
//                   >
//                     <GitHubLogoIcon className="mr-2 w-5 h-5" />
//                     Github
//                   </a>
//                 </nav>
//               </SheetContent>
//             </Sheet>
//           </span>

//           {/* desktop */}
//           <nav className="hidden md:flex gap-2">
//             {routeList.map((route: RouteProps, i) => (
//               <a
//                 rel="noreferrer noopener"
//                 href={route.href}
//                 key={i}
//                 className={`text-[17px] ${buttonVariants({
//                   variant: "ghost",
//                 })}`}
//               >
//                 {route.label}
//               </a>
//             ))}
//           </nav>

//           <div className="hidden md:flex gap-2">
//             <a
//               rel="noreferrer noopener"
//               href="https://github.com/leoMirandaa/shadcn-landing-page.git"
//               target="_blank"
//               className={`border ${buttonVariants({ variant: "secondary" })}`}
//             >
//               <GitHubLogoIcon className="mr-2 w-5 h-5" />
//               Github
//             </a>

//             <ModeToggle />
//           </div>
//         </NavigationMenuList>
//       </NavigationMenu>
//     </header>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Component() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        <Link
          href="#"
          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="#"
          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="#"
          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
          prefetch={false}
        >
          Contact
        </Link>
        <ModeToggle />
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
              href="#"
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
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

function MenuIcon(props: any) {
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

function MountainIcon(props: any) {
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
