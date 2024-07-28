"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu/navbar-menu";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../ui/SearchIcon";

export function NavbarHeader() {
  return (
    <div className="">
      <div className="w-full items-center justify-center ">
        <div className="h-[40px] text-white bg-pink relative flex justify-between items-center flex-row overflow-hidden
   mx-auto sm:px-28 px-5">
          <div className="flex space-x-4 flex-row">
            <div>
              <i className="fa-solid fa-phone"></i> 0908145344
            </div>
            <div>
              <i className="fa-regular fa-envelope"></i> nhumystudio@gmail.com
            </div>
          </div>
          <div className="flex space-x-4 flex-row">
            Chat with me
          </div>
          <div className="flex space-x-4 justify-between items-center flex-row">
            <div>
              <a href="">ABOUT NHUMY</a>
            </div>
            <div>|</div>
            <div>
              <a href="">Liên hệ</a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex justify-between items-center flex-row 
   mx-auto sm:px-28 px-5">
        <Link href="/">
          <img src="/images/Nhu-My-Studio.png" width={60} height={60} alt="logo" />
        </Link>
        <Navbar className="top-0" />
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </div>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { data: session } = useSession();
  const pathUrl = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);
  const [sticky, setSticky] = useState(true);

  const { theme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [navbarDisplay, setNavbarDisplay] = useState("block"); // Add state for navbar display

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      console.log("display", navbarDisplay)
      if (scrollYProgress.get() < 0.1) {
        setVisible(true);
        setNavbarDisplay("block"); // Set display to block
      } else {
        if (scrollYProgress.getPrevious()! > scrollYProgress.get()) {
          setVisible(true);
        } else {
          setVisible(false);
        }
        setNavbarDisplay("fixed");
      }
      console.log("display", navbarDisplay)

    }
  });
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          // opacity: 1,
          // y: -100,
          display: navbarDisplay
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
          display: navbarDisplay
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          `${navbarDisplay} top-14 inset-x-0 w-full mx-auto z-50`,
          className
        )}
      >

        <Menu setActive={setActive}>

          <MenuItem setActive={setActive} active={null} item="TRANG CHỦ">

          </MenuItem>
          <MenuItem setActive={setActive} active={null} item="DỊCH VỤ">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Web Development</HoveredLink>
              <HoveredLink href="/interface-design">Interface Design</HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
              <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="BẢNG GIÁ">
            <div className="  text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Algochurn"
                href="https://algochurn.com"
                src="https://assets.aceternity.com/demos/algochurn.webp"
                description="Prepare for tech interviews like never before."
              />
              <ProductItem
                title="Tailwind Master Kit"
                href="https://tailwindmasterkit.com"
                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                description="Production ready Tailwind css components for your next project"
              />
              <ProductItem
                title="Moonbeam"
                href="https://gomoonbeam.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                description="Never write from scratch again. Go from idea to blog in minutes."
              />
              <ProductItem
                title="Rogue"
                href="https://userogue.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
              />
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="ALBUM">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Web Development</HoveredLink>
              <HoveredLink href="/interface-design">Interface Design</HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
              <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
          </MenuItem>
          
          <MenuItem setActive={setActive} active={active} item="Pricing">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/hobby">Hobby</HoveredLink>
              <HoveredLink href="/individual">Individual</HoveredLink>
              <HoveredLink href="/team">Team</HoveredLink>
              <HoveredLink href="/enterprise">Enterprise</HoveredLink>
            </div>
          </MenuItem>
          <button
            aria-label="theme toggler"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white"
          >
            <span>
              <svg
                viewBox="0 0 16 16"
                className="hidden h-[22px] w-[22px] fill-current dark:block"
              >
                <path d="M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z" />
              </svg>

              <svg
                viewBox="0 0 23 23"
                className={`h-[30px] w-[30px] fill-current text-dark dark:hidden ${!sticky && pathUrl === "/" && "text-white"
                  }`}
              >
                <g clipPath="url(#clip0_40_125)">
                  <path d="M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z" />
                </g>
              </svg>
            </span>
          </button>
        </Menu>

      </motion.div>
    </AnimatePresence>
  );
}

// "use client";
// import { signOut, useSession } from "next-auth/react";
// import { useTheme } from "next-themes";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import menuData from "./menuData";

// const Header = () => {
//   const { data: session } = useSession();

//   const pathUrl = usePathname();
//   // Navbar toggle
//   const [navbarOpen, setNavbarOpen] = useState(false);
//   const navbarToggleHandler = () => {
//     setNavbarOpen(!navbarOpen);
//   };

//   // Sticky Navbar
//   const [sticky, setSticky] = useState(false);
//   const handleStickyNavbar = () => {
//     if (window.scrollY >= 80) {
//       setSticky(true);
//     } else {
//       setSticky(false);
//     }
//   };
//   useEffect(() => {
//     window.addEventListener("scroll", handleStickyNavbar);
//   });

//   // submenu handler
//   const [openIndex, setOpenIndex] = useState(-1);
//   const handleSubmenu = (index: any) => {
//     if (openIndex === index) {
//       setOpenIndex(-1);
//     } else {
//       setOpenIndex(index);
//     }
//   };

//   const { theme, setTheme } = useTheme();

//   return (
//     <>
//       <header
//         className={`ud-header left-0 top-0 z-40 flex w-full items-center ${
//           sticky
//             ? "shadow-nav fixed z-[999] border-b border-stroke bg-white/80 backdrop-blur-[5px] dark:border-dark-3/20 dark:bg-dark/10"
//             : "absolute bg-transparent"
//         }`}
//       >
//         <div className="container">
//           <div className="relative -mx-4 flex items-center justify-between">
//             <div className="w-60 max-w-full px-4">
//               <Link
//                 href="/"
//                 className={`navbar-logo block w-full ${
//                   sticky ? "py-2" : "py-5"
//                 } `}
//               >
//                 {pathUrl !== "/" ? (
//                   <>
//                     <Image
//                       src={`/images/logo/logo.svg`}
//                       alt="logo"
//                       width={240}
//                       height={30}
//                       className="header-logo w-full dark:hidden"
//                     />
//                     <Image
//                       src={`/images/logo/logo-white.svg`}
//                       alt="logo"
//                       width={240}
//                       height={30}
//                       className="header-logo hidden w-full dark:block"
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <Image
//                       src={`${
//                         sticky
//                           ? "/images/logo/logo.svg"
//                           : "/images/logo/logo-white.svg"
//                       }`}
//                       alt="logo"
//                       width={140}
//                       height={30}
//                       className="header-logo w-full dark:hidden"
//                     />
//                     <Image
//                       src={"/images/logo/logo-white.svg"}
//                       alt="logo"
//                       width={140}
//                       height={30}
//                       className="header-logo hidden w-full dark:block"
//                     />
//                   </>
//                 )}
//               </Link>
//             </div>
//             <div className="flex w-full items-center justify-between px-4">
//               <div>
//                 <button
//                   onClick={navbarToggleHandler}
//                   id="navbarToggler"
//                   aria-label="Mobile Menu"
//                   className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
//                 >
//                   <span
//                     className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
//                       navbarOpen ? " top-[7px] rotate-45" : " "
//                     } ${pathUrl !== "/" && "!bg-dark dark:!bg-white"} ${
//                       pathUrl === "/" && sticky
//                         ? "bg-dark dark:bg-white"
//                         : "bg-white"
//                     }`}
//                   />
//                   <span
//                     className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
//                       navbarOpen ? "opacity-0 " : " "
//                     } ${pathUrl !== "/" && "!bg-dark dark:!bg-white"} ${
//                       pathUrl === "/" && sticky
//                         ? "bg-dark dark:bg-white"
//                         : "bg-white"
//                     }`}
//                   />
//                   <span
//                     className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
//                       navbarOpen ? " top-[-8px] -rotate-45" : " "
//                     } ${pathUrl !== "/" && "!bg-dark dark:!bg-white"} ${
//                       pathUrl === "/" && sticky
//                         ? "bg-dark dark:bg-white"
//                         : "bg-white"
//                     }`}
//                   />
//                 </button>
//                 <nav
//                   id="navbarCollapse"
//                   className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark-2 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 lg:dark:bg-transparent ${
//                     navbarOpen
//                       ? "visibility top-full opacity-100"
//                       : "invisible top-[120%] opacity-0"
//                   }`}
//                 >
//                   <ul className="block lg:ml-8 lg:flex lg:gap-x-8 xl:ml-14 xl:gap-x-12">
//                     {menuData.map((menuItem, index) =>
//                       menuItem.path ? (
//                         <li key={index} className="group relative">
//                           {pathUrl !== "/" ? (
//                             <Link
//                               onClick={navbarToggleHandler}
//                               scroll={false}
//                               href={menuItem.path}
//                               className={`ud-menu-scroll flex py-2 text-base text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary lg:inline-flex lg:px-0 lg:py-6 ${
//                                 pathUrl === menuItem?.path && "text-primary"
//                               }`}
//                             >
//                               {menuItem.title}
//                             </Link>
//                           ) : (
//                             <Link
//                               scroll={false}
//                               href={menuItem.path}
//                               className={`ud-menu-scroll flex py-2 text-base lg:inline-flex lg:px-0 lg:py-6 ${
//                                 sticky
//                                   ? "text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary"
//                                   : "text-body-color dark:text-white lg:text-white"
//                               } ${
//                                 pathUrl === menuItem?.path &&
//                                 sticky &&
//                                 "!text-primary"
//                               }`}
//                             >
//                               {menuItem.title}
//                             </Link>
//                           )}
//                         </li>
//                       ) : (
//                         <li className="submenu-item group relative" key={index}>
//                           {pathUrl !== "/" ? (
//                             <button
//                               onClick={() => handleSubmenu(index)}
//                               className={`ud-menu-scroll flex items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary lg:inline-flex lg:px-0 lg:py-6`}
//                             >
//                               {menuItem.title}

//                               <span className="pl-1">
//                                 <svg
//                                   className={`duration-300 lg:group-hover:rotate-180`}
//                                   width="16"
//                                   height="17"
//                                   viewBox="0 0 16 17"
//                                   fill="none"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                   <path
//                                     d="M8.00039 11.9C7.85039 11.9 7.72539 11.85 7.60039 11.75L1.85039 6.10005C1.62539 5.87505 1.62539 5.52505 1.85039 5.30005C2.07539 5.07505 2.42539 5.07505 2.65039 5.30005L8.00039 10.525L13.3504 5.25005C13.5754 5.02505 13.9254 5.02505 14.1504 5.25005C14.3754 5.47505 14.3754 5.82505 14.1504 6.05005L8.40039 11.7C8.27539 11.825 8.15039 11.9 8.00039 11.9Z"
//                                     fill="currentColor"
//                                   />
//                                 </svg>
//                               </span>
//                             </button>
//                           ) : (
//                             <button
//                               onClick={() => handleSubmenu(index)}
//                               className={`ud-menu-scroll flex items-center justify-between py-2 text-base lg:inline-flex lg:px-0 lg:py-6 ${
//                                 sticky
//                                   ? "text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary"
//                                   : "text-white"
//                               }`}
//                             >
//                               {menuItem.title}

//                               <span className="pl-1">
//                                 <svg
//                                   className={`duration-300 lg:group-hover:rotate-180`}
//                                   width="16"
//                                   height="17"
//                                   viewBox="0 0 16 17"
//                                   fill="none"
//                                   xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                   <path
//                                     d="M8.00039 11.9C7.85039 11.9 7.72539 11.85 7.60039 11.75L1.85039 6.10005C1.62539 5.87505 1.62539 5.52505 1.85039 5.30005C2.07539 5.07505 2.42539 5.07505 2.65039 5.30005L8.00039 10.525L13.3504 5.25005C13.5754 5.02505 13.9254 5.02505 14.1504 5.25005C14.3754 5.47505 14.3754 5.82505 14.1504 6.05005L8.40039 11.7C8.27539 11.825 8.15039 11.9 8.00039 11.9Z"
//                                     fill="currentColor"
//                                   />
//                                 </svg>
//                               </span>
//                             </button>
//                           )}

//                           <div
//                             className={`submenu relative left-0 top-full w-[250px] rounded-sm bg-white p-4 transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark-2 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
//                               openIndex === index ? "!-left-[25px]" : "hidden"
//                             }`}
//                           >
//                             {menuItem?.submenu?.map((submenuItem: any, i) => (
//                               <Link
//                                 href={submenuItem.path}
//                                 key={i}
//                                 className={`block rounded px-4 py-[10px] text-sm ${
//                                   pathUrl === submenuItem.path
//                                     ? "text-primary"
//                                     : "text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary"
//                                 }`}
//                               >
//                                 {submenuItem.title}
//                               </Link>
//                             ))}
//                           </div>
//                         </li>
//                       ),
//                     )}
//                   </ul>
//                 </nav>
//               </div>
//               <div className="hidden items-center justify-end pr-16 sm:flex lg:pr-0">
//                 {/* theme toggler */}
//                 <button
//                   aria-label="theme toggler"
//                   onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//                   className="flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white"
//                 >
//                   <span>
//                     <svg
//                       viewBox="0 0 16 16"
//                       className="hidden h-[22px] w-[22px] fill-current dark:block"
//                     >
//                       <path d="M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z" />
//                     </svg>

//                     <svg
//                       viewBox="0 0 23 23"
//                       className={`h-[30px] w-[30px] fill-current text-dark dark:hidden ${
//                         !sticky && pathUrl === "/" && "text-white"
//                       }`}
//                     >
//                       <g clipPath="url(#clip0_40_125)">
//                         <path d="M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z" />
//                       </g>
//                     </svg>
//                   </span>
//                 </button>

//                 {session?.user ? (
//                   <>
//                     <p
//                       className={`loginBtn px-7 py-3 text-base font-medium ${
//                         !sticky && pathUrl === "/" ? "text-white" : "text-dark"
//                       }`}
//                     >
//                       {session?.user?.name}
//                     </p>
//                     {pathUrl !== "/" || sticky ? (
//                       <button
//                         onClick={() => signOut()}
//                         className="signUpBtn rounded-lg bg-primary bg-opacity-100 px-6 py-3 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-20 hover:text-dark"
//                       >
//                         Sign Out
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => signOut()}
//                         className="signUpBtn rounded-lg bg-white bg-opacity-20 px-6 py-3 text-base font-medium text-white duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark"
//                       >
//                         Sign Out
//                       </button>
//                     )}
//                   </>
//                 ) : (
//                   <>
//                     {pathUrl !== "/" ? (
//                       <>
//                         <Link
//                           href="/signin"
//                           className="px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white"
//                         >
//                           Sign In
//                         </Link>
//                         <Link
//                           href="/signup"
//                           className="rounded-lg bg-primary px-6 py-3 text-base font-medium text-white duration-300 ease-in-out hover:bg-primary/90 dark:bg-white/10 dark:hover:bg-white/20"
//                         >
//                           Sign Up
//                         </Link>
//                       </>
//                     ) : (
//                       <>
//                         <Link
//                           href="/signin"
//                           className={`px-7 py-3 text-base font-medium hover:opacity-70 ${
//                             sticky ? "text-dark dark:text-white" : "text-white"
//                           }`}
//                         >
//                           Sign In
//                         </Link>
//                         <Link
//                           href="/signup"
//                           className={`rounded-lg px-6 py-3 text-base font-medium text-white duration-300 ease-in-out ${
//                             sticky
//                               ? "bg-primary hover:bg-primary/90 dark:bg-white/10 dark:hover:bg-white/20"
//                               : "bg-white/10 hover:bg-white/20"
//                           }`}
//                         >
//                           Sign Up
//                         </Link>
//                       </>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;