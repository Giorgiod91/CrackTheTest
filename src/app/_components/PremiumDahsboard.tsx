"use client";
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  Calendar,
  Bell,
  PlusCircle,
} from "lucide-react";
import CreateTest from "./CreateTest";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {};

type Test = {
  id: number;
  title: string;
  content: string;
  created_at?: string | null;
  authorid: number;
};

function PremiumDahsboard({}: Props) {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [pushTitle, setPushTitle] = useState("eta");
  const [pushContent, setPushContent] = useState("ja genau ffff");
  const [pushSubject, setPushSubject] = useState("math");
  // creating usetate to display the data from backend that the users wants for example if the user press anaytics then display analytics data
  const [displayData, setDisplayData] = useState<string>("Dashboard");

  useEffect(() => {
    // fetch recent tests
    async function fetchTestData() {
      setLoading(true);

      try {
        const response = await fetch("http://127.0.0.1:8000/display_data/1", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching tests");
        }
        const data = await response.json();
        setTests(data);
      } catch (err) {
        console.error("Unexpected error fetching tests", err);
        setTests([]);
      }
      setLoading(false);
    }

    fetchTestData();
  }, []);

  async function deleteTest(id: number) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/delete_test/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error deleting test");
      }
    } catch (err) {
      console.error("Unexpected error deleting test", err);
    }
  }

  async function createTest(title: string, content: string, subject: string) {
    try {
      const response = await fetch("http://127.0.0.1:8000/create_test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error creating new Test !!");
      }
    } catch (err) {
      console.log("error creating Test", err);
    }
  }

  // Prepare chart data from tests (last 14 days)
  const getChartData = () => {
    const now = new Date();
    const chartData: { date: string; count: number; dateObj?: Date }[] = [];

    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      chartData.push({ date: dateStr, count: 0, dateObj: d });
    }

    tests.forEach((test) => {
      if (test.created_at) {
        const testDate = new Date(test.created_at);
        testDate.setHours(0, 0, 0, 0);

        chartData.forEach((data) => {
          if (data.dateObj) {
            const d = new Date(data.dateObj);
            d.setHours(0, 0, 0, 0);
            if (d.getTime() === testDate.getTime()) {
              data.count++;
            }
          }
        });
      }
    });

    return chartData.map(({ dateObj, ...rest }) => rest);
  };

  const navlist = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Users", icon: <Users size={20} /> },
    { name: "Analytics", icon: <BarChart3 size={20} /> },
    { name: "Messages", icon: <MessageSquare size={20} /> },
    { name: "Calendar", icon: <Calendar size={20} /> },
    { name: "Notifications", icon: <Bell size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Premium Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Overview & recent activity
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="hidden items-center gap-3 sm:flex">
            <input
              type="search"
              placeholder="Search tests..."
              className="input input-sm input-bordered w-60"
            />
            <button className="btn btn-sm">Search</button>
          </div>
          <button className="btn btn-ghost btn-circle">
            <Bell />
          </button>
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://img.daisyui.com/images/profile/demo/avatar-1.jpg"
                alt="me"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-base-100 border-base-200 rounded-xl border p-6 shadow-xl">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-2">
            <div className="rounded-xl bg-gradient-to-b from-[#FF705B] to-[#FFB457] p-3 text-white shadow-md">
              <div className="mb-4 flex items-center justify-center">
                <div className="text-lg font-semibold">Crack</div>
                <div className="ml-1 bg-gradient-to-br from-[#FF705B] to-[#FFB457] bg-clip-text font-semibold text-transparent">
                  TheTest
                </div>
              </div>
              <nav className="flex flex-col gap-2">
                {navlist.map((n) => (
                  <button
                    key={n.name}
                    onClick={() => setDisplayData(n.name)}
                    className="flex transform items-center gap-3 rounded-md px-3 py-2 transition hover:scale-105 hover:bg-white/10"
                  >
                    <div className="text-white opacity-90">{n.icon}</div>
                    <span className="text-sm">{n.name}</span>
                  </button>
                ))}
                <div className="mt-4 border-t pt-3">
                  <button className="btn btn-sm btn-outline w-full gap-2">
                    <PlusCircle /> Create
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="col-span-12 md:col-span-7">
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="transform rounded-xl bg-gradient-to-r from-[#FF705B] to-[#FFB457] p-4 text-white shadow transition hover:scale-105 hover:shadow-2xl">
                <div className="text-sm">Total Tests</div>
                <div className="text-2xl font-bold">{tests.length}</div>
                <div className="text-xs opacity-80">
                  since your account creation
                </div>
              </div>
              <div className="bg-base-100 transform rounded-xl border p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="text-sm">Active Users</div>
                <div className="text-2xl font-bold">1,254</div>
                <div className="text-xs opacity-80">last 30 days</div>
              </div>
            </div>

            <section className="bg-base-100 rounded-xl border p-4 shadow-sm transition hover:shadow-lg">
              {displayData === "Dashboard" ? (
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Recent Tests</h3>
                  <button
                    onClick={() =>
                      createTest(pushTitle, pushContent, pushSubject)
                    }
                  >
                    create test
                  </button>
                </div>
              ) : (
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Analytics</h3>
                </div>
              )}

              <div className="space-y-3">
                {displayData === "Dashboard" ? (
                  <>
                    {loading && (
                      <div className="text-muted-foreground text-sm">
                        Loading...
                      </div>
                    )}
                    {!loading && tests.length === 0 && (
                      <div className="text-muted-foreground text-sm">
                        No tests yet — create your first test.
                      </div>
                    )}

                    {tests.map((t) => {
                      console.log(t);

                      return (
                        <div
                          key={t.id}
                          className="flex transform items-start gap-4 rounded-lg bg-white/60 p-3 transition hover:-translate-y-1 hover:scale-[1.01] hover:bg-white/70 hover:shadow-lg hover:ring-1 hover:ring-[#FF705B]/10"
                        >
                          <div className="avatar">
                            <div className="w-12 rounded">
                              <img
                                src={`https://i.pravatar.cc/80?u=${t.id}`}
                                alt="profile"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-semibold">{t.title}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button className="btn btn-xs btn-ghost">
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteTest(t.id)}
                                  className="btn btn-xs btn-ghost"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <div className="text-muted-foreground mt-2 text-sm">
                              {t.content}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : displayData === "Analytics" ? (
                  <div className="h-61 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                          }}
                          labelStyle={{ color: "#000" }}
                          cursor={{ fill: "rgba(255, 112, 91, 0.1)" }}
                        />
                        <Bar
                          dataKey="count"
                          fill="#FF705B"
                          radius={[8, 8, 0, 0]}
                          name="Tests created"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : null}
              </div>
            </section>
          </main>

          {/* Right column / Metrics */}
          <aside className="col-span-12 md:col-span-3">
            <div className="bg-base-100 mb-4 rounded-xl border p-4 shadow-sm">
              <h4 className="font-medium">Metrics</h4>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded bg-[#FF705B]/10 p-3 text-center">
                  Conversion
                  <br />
                  <span className="font-bold">4.3%</span>
                </div>
                <div className="rounded bg-[#FF705B]/10 p-3 text-center">
                  Retention
                  <br />
                  <span className="font-bold">72%</span>
                </div>
              </div>
            </div>

            <div className="bg-base-100 rounded-xl border p-4 shadow-sm">
              <h4 className="font-medium">Quick Actions</h4>
              <div className="mt-3 flex flex-col gap-2">
                <button className="btn btn-sm">Create Test</button>
                <button className="btn btn-sm btn-outline">Export</button>
                <button className="btn btn-sm btn-ghost">Settings</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default PremiumDahsboard;
