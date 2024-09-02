"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";

import { IoAlbumsOutline, IoAlbums } from "react-icons/io5";
import { MdInsertPhoto, MdMiscellaneousServices  } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";

const SidebarDashboard = () => {
  return (
    <div className="fixed bg-slate-900 text-slate-100 flex">
      <SideNav />
    </div>
  );
};

const SideNav = () => {
  const pathname = usePathname();

  const navItems = [
    { id: 4, href: "/dashboard", icon: <RxDashboard /> },
    { id: 0, href: "/dashboard/album", icon: <IoAlbumsOutline /> },
    { id: 1, href: "/dashboard/photo", icon: <MdInsertPhoto /> },
    { id: 2, href: "/dashboard/service", icon: <MdMiscellaneousServices /> },
    { id: 3, href: "/dashboard/outfit", icon: <GiClothes /> },
  ];

  return (
    <nav className="h-screen w-fit bg-black p-4 flex flex-col items-center gap-2">
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          selected={pathname === item.href}
          id={item.id}
          setSelected={() => {}}
          href={item.href}
        >
          {item.icon}
        </NavItem>
      ))}
    </nav>
  );
};

const NavItem = ({
  children,
  selected,
  id,
  setSelected,
  href,
}: {
  children: JSX.Element;
  selected: boolean;
  id: number;
  setSelected: Dispatch<SetStateAction<number>>;
  href: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    setSelected(id);
    router.push(href); // Navigate to the specified route
  };

  return (
    <motion.button
      className={`p-3 text-xl bg-slate-600 hover:bg-slate-700 rounded-md transition-colors relative ${
        selected ? "bg-indigo-600" : ""
      }`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="block relative z-10">{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 rounded-md bg-white z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default SidebarDashboard;
