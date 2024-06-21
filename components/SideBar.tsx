/** @format */
"use client";

import { useState } from "react";
import { NavBar } from "./ui/nav";

type Props = {};

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  Shield,
  AppWindow
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
      
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
    
      <NavBar
        isCollapsed={ isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default"
          },
          {
            title: "Adminstrators",
            href: "/admins",
            icon: Shield,
            variant: "ghost"
          },
          {
            title: "Application Details",
            href: "/applicationdetails",
            icon: AppWindow,
            variant: "ghost"
          },
          {
            title: "Manage",
            href: "/manage",
            icon: Settings,
            variant: "ghost"
          }
        ]}
      />
    </div>
  );
}