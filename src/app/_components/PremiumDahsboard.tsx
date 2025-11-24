import React from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  Calendar,
  Bell,
  Home,
  LogOut,
} from "lucide-react";

type Props = {};
//::TODO: create modern Dashboard

function PremiumDahsboard({}: Props) {
  // defining sidebar content later map through to diplay those
  const navliste = [
    { name: "Dashboard", icon: <LayoutDashboard size={28} color="white" /> },
    { name: "Users", icon: <Users size={28} color="white" /> },
    { name: "Analytics", icon: <BarChart3 size={28} color="white" /> },
    { name: "Messages", icon: <MessageSquare size={28} color="white" /> },
    { name: "Calendar", icon: <Calendar size={28} color="white" /> },
    { name: "Notifications", icon: <Bell size={28} color="white" /> },
    { name: "Home", icon: <Home size={28} color="white" /> },
    { name: "Settings", icon: <Settings size={28} color="white" /> },
    { name: "Logout", icon: <LogOut size={28} color="white" /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="p-5 text-4xl">Overview</h1>

      <div className="flex h-[850px] w-[1200px] rounded-xl border bg-amber-50 shadow-xl">
        {/* so here starts the sidebar nav component */}
        <div className="flex h-[850px] w-[80px] flex-col items-center space-y-6 rounded-xl bg-black">
          <img src="" alt="logo" />
          {navliste.map((item, index) => (
            <div className="text-white">
              <p className="cursor-pointer rounded-xl hover:bg-gray-400">
                {item.icon}
              </p>{" "}
            </div>
          ))}
          <img src="" alt="users avatar" />
        </div>
        {/* analytics part ::TODO: style the part with icons and display ml difficulty */}
        <div className="flex h-[310px] w-[560px] flex-col border p-5">
          <h3>Analytics</h3>
          <div className="flex flex-row space-x-5">
            <div className="h-[190px] w-[220px] rounded-2xl border bg-gradient-to-r from-red-200 to-red-500 p-5 text-white">
              <p>hallo</p>
              <p>2500</p>
            </div>
            <div className="h-[190px] w-[220px] rounded-2xl border bg-gray-400 p-5 text-white">
              <p>hallo</p>
              <p>2500</p>
            </div>
          </div>
        </div>
        {/* recent prompts or tests that have been created by the user  */}
        <div></div>
        <h3>Overview</h3>
        <p>dasdasdads</p>
      </div>
    </div>
  );
}

export default PremiumDahsboard;
