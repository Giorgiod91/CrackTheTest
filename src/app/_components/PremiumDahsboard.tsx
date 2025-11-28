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
  // hardcoded data for now later will fetch those from the database for every user
  const old_prompts = [
    {
      title: "Generate Marketing Email",
      date: "2025-11-20",
      time: "14:32",
      difficulty: "Medium",
    },
    {
      title: "Create SEO Keyword List",
      date: "2025-11-18",
      time: "09:10",
      difficulty: "Easy",
    },
    {
      title: "Write Python Script – Data Cleaner",
      date: "2025-11-15",
      time: "20:44",
      difficulty: "Hard",
    },
    {
      title: "Social Media Caption Ideas",
      date: "2025-11-10",
      time: "16:22",
      difficulty: "Easy",
    },
    {
      title: "Sentiment Analysis on Reviews",
      date: "2025-11-08",
      time: "11:03",
      difficulty: "Medium",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="p-5 text-4xl">Overview</h1>

      <div className="bg-base-100 flex h-[850px] w-[1350px] rounded-xl border shadow-xl">
        {/* so here starts the sidebar nav component */}
        <div className="flex h-[850px] w-[80px] flex-col items-center space-y-6 rounded-xl bg-gradient-to-b from-[#FF705B] to-[#FFB457]">
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
        <div>
          <div className="flex h-[310px] w-[760px] flex-col p-5">
            <h3>Analytics</h3>
            <div className="flex flex-row space-x-5">
              <div className="h-[190px] w-[298px] rounded-2xl border bg-gradient-to-r from-[#FF705B] to-[#FFB457] p-5 text-white">
                <p>hallo</p>
                <p>2500</p>
              </div>
              <div className="text-base-content h-[190px] w-[298px] rounded-2xl border bg-[#FF705B]/10 p-5">
                <p>hallo</p>
                <p>2500</p>
              </div>
            </div>
          </div>
          {/* recent prompts or tests that have been created by the user  */}
          <div className="flex h-[500px] w-[660px] flex-col space-y-2 p-5">
            <p>last created tests</p>
            {old_prompts.map((prompt, index) => (
              <div className="flex h-[65px] items-center space-x-6 rounded-xl border bg-[#FF705B]/5 p-2">
                <div className="avatar">
                  <div className="w-16 rounded">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
                      alt="Tailwind-CSS-Avatar-component"
                    />
                  </div>
                </div>
                <p>{prompt.title}</p>
                <p>{prompt.date}</p>
                <p>{prompt.time}</p>
                <p>{prompt.difficulty}</p>
                <p>...</p>
              </div>
            ))}
          </div>
        </div>
        {/* Top right part not sure yet what i will put there  */}
        <div className="flex flex-col p-5">
          <h3>Metrics</h3>
          <div className="flex flex-row space-x-2">
            <div className="flex h-[240px] w-[180px] flex-col rounded-xl border bg-[#FF705B]/10"></div>
            <div className="flex h-[240px] w-[220px] flex-col rounded-xl border bg-[#FF705B]/10"></div>
          </div>
          {/* bottom right part some cool graphics  */}
          <div className="mt-20 flex h-[350px] w-[320px] flex-col rounded-xl border bg-[#FFB457]/10 p-5">
            <p>hey</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumDahsboard;
