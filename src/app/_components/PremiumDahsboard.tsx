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
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { boolean } from "zod";

type Props = {};

type Test = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  authorid: string;
  subject?: string;
};

function PremiumDahsboard({}: Props) {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [displayData, setDisplayData] = useState<string>("Dashboard");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // state for delete so i can rerender to see which test are current
  const [userDeleted, setUserDeleted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    subject: "",
  });

  const supabase = getSupabaseBrowserClient();

  // Fetch tests from Supabase
  useEffect(() => {
    fetchTests();
  }, [userDeleted]);

  async function fetchTests() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("AUTH USER ID:", user?.id);

      if (!user) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("tests")
        .select("*")
        .eq("authorid", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setTests(data || []);
    } catch (err) {
      console.error("Error fetching tests:", err);
      setError("Failed to load tests");
      setTests([]);
    } finally {
      setLoading(false);
    }
  }

  async function createTest(title: string, content: string, subject?: string) {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("Current user for insert:", user);

      if (!user) {
        setError("User not authenticated");
        return;
      }

      // Check if user exists in database
      const { data: dbUser, error: dbUserError } = await supabase
        .from("users")
        .select("real_member_id, premium")
        .eq("real_member_id", user.id)
        .maybeSingle();

      if (dbUserError) {
        console.error("Error fetching user from database:", dbUserError);
        setError("Database user lookup failed");
        return;
      }

      if (!dbUser) {
        console.error("User not found in database:", user.id);
        setError("User not found in database");
        return;
      }

      console.log("Database user:", dbUser);

      const { data: insertData, error: insertError } = await supabase
        .from("tests")
        .insert([
          {
            title,
            content,
            // TODO: add subject column to tests table first
            // subject,
            authorid: user.id,
          },
        ])
        .select();

      if (insertError) {
        console.error("Insert error details:", insertError);
        throw insertError;
      }

      console.log("Test created successfully:", insertData);
      setFormData({ title: "", content: "", subject: "" });
      setShowCreateModal(false);
      await fetchTests();
    } catch (err) {
      console.error("Error creating test:", err);
      setError("Failed to create test");
    }
  }

  async function deleteTest(id: string) {
    try {
      const { error: deleteError } = await supabase
        .from("tests")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      await fetchTests();
    } catch (err) {
      console.error("Error deleting test:", err);
      setError("Failed to delete test");
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
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-[#FF705B] to-[#FFB457] bg-clip-text text-4xl font-bold text-transparent">
            Premium Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            📊 Overview & recent activity
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="hidden items-center gap-3 sm:flex">
            <div className="relative">
              <input
                type="search"
                placeholder="Search tests..."
                className="input input-sm input-bordered w-60 pr-10 focus:ring-2 focus:ring-[#FF705B]/50"
              />
              <button className="btn btn-sm btn-ghost absolute top-0 right-0">
                🔍
              </button>
            </div>
          </div>
          <button className="btn btn-ghost btn-circle hover:bg-[#FF705B]/10">
            <Bell className="text-[#FF705B]" />
          </button>
          <div className="avatar ring ring-[#FF705B]/30 ring-offset-2">
            <div className="w-10 rounded-full">
              <img
                src="https://img.daisyui.com/images/profile/demo/avatar-1.jpg"
                alt="me"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl dark:bg-black/10">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-2">
            <div className="sticky top-6 rounded-2xl bg-gradient-to-b from-[#FF705B] to-[#FFB457] p-4 text-white shadow-2xl">
              <div className="mb-6 flex items-center justify-center gap-1">
                <div className="text-xl font-bold">Crack</div>
                <div className="text-xl font-bold text-white/90">TheTest</div>
              </div>
              <nav className="flex flex-col gap-1.5">
                {navlist.map((n) => (
                  <button
                    key={n.name}
                    onClick={() => setDisplayData(n.name)}
                    className={`flex transform items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 ${
                      displayData === n.name
                        ? "scale-[1.02] bg-white/20 shadow-md"
                        : "hover:scale-[1.02] hover:bg-white/10"
                    }`}
                  >
                    <div className="text-white">{n.icon}</div>
                    <span className="text-sm font-medium">{n.name}</span>
                  </button>
                ))}
                <div className="mt-4 border-t border-white/20 pt-4">
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn btn-sm w-full gap-2 border-white/30 bg-white/10 text-white transition-all hover:scale-105 hover:bg-white/20"
                  >
                    <PlusCircle size={18} />{" "}
                    <span className="font-semibold">Create Test</span>
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="col-span-12 md:col-span-7">
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="group relative transform overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF705B] via-[#FF8C73] to-[#FFB457] p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium opacity-90">
                      📝 Total Tests
                    </div>
                    <div className="rounded-full bg-white/20 p-2">
                      <BarChart3 size={20} />
                    </div>
                  </div>
                  <div className="mt-3 text-4xl font-bold">{tests.length}</div>
                  <div className="mt-1 text-xs opacity-80">
                    since your account creation
                  </div>
                </div>
              </div>
              <div className="group relative transform overflow-hidden rounded-2xl border border-[#FF705B]/20 bg-gradient-to-br from-white/80 to-white/60 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:from-black/30 dark:to-black/20">
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[#FF705B]/10 blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      👥 Active Users
                    </div>
                    <div className="rounded-full bg-[#FF705B]/10 p-2">
                      <Users size={20} className="text-[#FF705B]" />
                    </div>
                  </div>
                  <div className="mt-3 text-4xl font-bold text-gray-800 dark:text-gray-100">
                    1,254
                  </div>
                  <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    last 30 days
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="alert alert-error mb-4 rounded-lg p-3">
                <span className="text-sm">{error}</span>
              </div>
            )}

            <section className="rounded-xl border border-white/20 bg-white/30 p-4 shadow-sm backdrop-blur-lg transition hover:shadow-lg dark:bg-black/20">
              {displayData === "Dashboard" ? (
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Recent Tests</h3>
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

                    {tests.map((t) => (
                      <div
                        key={t.id}
                        className="group flex transform items-start gap-4 rounded-xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/50 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF705B]/30 hover:shadow-xl dark:border-gray-700 dark:from-gray-800/50 dark:to-gray-900/50"
                      >
                        <div className="avatar ring-2 ring-[#FF705B]/20 ring-offset-2">
                          <div className="w-14 rounded-lg">
                            <img
                              src={`https://i.pravatar.cc/80?u=${t.authorid}`}
                              alt="profile"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                {t.title}
                              </div>
                              <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <Calendar size={12} />
                                <span>
                                  {new Date(t.created_at).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    },
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                              <button className="btn btn-xs border-none bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => deleteTest(t.id)}
                                className="btn btn-xs border-none bg-red-500/10 text-red-600 hover:bg-red-500/20"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </div>
                          <div className="text-muted-foreground mt-3 text-sm leading-relaxed">
                            {t.content}
                          </div>
                          {t.subject && (
                            <div className="mt-3">
                              <span className="badge border-[#FF705B]/30 bg-gradient-to-r from-[#FF705B]/20 to-[#FFB457]/20 font-medium text-[#FF705B]">
                                {t.subject}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
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
          <aside className="col-span-12 space-y-4 md:col-span-3">
            <div className="bg-base-100 rounded-2xl border border-gray-200 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800/50">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-bold">
                📈 <span>Metrics</span>
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 p-4 text-center transition-transform hover:scale-105">
                  <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    Avg. Difficulty
                  </div>
                  <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    6.8/10
                  </div>
                </div>
                <div className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4 text-center transition-transform hover:scale-105">
                  <div className="text-xs font-medium text-purple-700 dark:text-purple-400">
                    Practice Sessions
                  </div>
                  <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                    124
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-base-100 rounded-2xl border border-gray-200 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800/50">
              <h4 className="mb-4 flex items-center gap-2 text-lg font-bold">
                ⚡ <span>Quick Actions</span>
              </h4>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn btn-sm border-none bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white shadow-md transition-transform hover:scale-105"
                >
                  <PlusCircle size={16} /> Create Test
                </button>
                <button className="btn btn-sm btn-outline border-[#FF705B]/30 text-[#FF705B] hover:border-[#FF705B] hover:bg-[#FF705B]/10">
                  📤 Export
                </button>
                <button className="btn btn-sm btn-ghost hover:bg-gray-100 dark:hover:bg-gray-700">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Create Test Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl border-t-4 border-[#FF705B] shadow-2xl">
            <h3 className="mb-6 flex items-center gap-2 bg-gradient-to-r from-[#FF705B] to-[#FFB457] bg-clip-text text-2xl font-bold text-transparent">
              <PlusCircle /> Create New Test
            </h3>

            <div className="form-control mb-4 w-full">
              <label className="label">
                <span className="label-text font-semibold">📝 Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter test title..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input input-bordered w-full focus:border-[#FF705B] focus:ring-2 focus:ring-[#FF705B]/50"
              />
            </div>

            <div className="form-control mb-4 w-full">
              <label className="label">
                <span className="label-text font-semibold">📚 Subject</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Math, Physics, Chemistry..."
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="input input-bordered w-full focus:border-[#FF705B] focus:ring-2 focus:ring-[#FF705B]/50"
              />
            </div>

            <div className="form-control mb-5 w-full">
              <label className="label">
                <span className="label-text font-semibold">📄 Content</span>
              </label>
              <textarea
                placeholder="Enter your test content here..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="textarea textarea-bordered h-40 w-full resize-none focus:border-[#FF705B] focus:ring-2 focus:ring-[#FF705B]/50"
              />
            </div>

            <div className="modal-action gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn btn-ghost hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ✕ Cancel
              </button>
              <button
                onClick={() =>
                  createTest(formData.title, formData.content, formData.subject)
                }
                className="btn border-none bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white shadow-lg transition-transform hover:scale-105"
              >
                ✓ Create Test
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowCreateModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
}

export default PremiumDahsboard;
