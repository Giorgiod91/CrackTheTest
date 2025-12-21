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

type Props = {};

type Test = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  subject?: string;
};

function PremiumDahsboard({}: Props) {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [displayData, setDisplayData] = useState<string>("Dashboard");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    subject: "",
  });

  const supabase = getSupabaseBrowserClient();

  // Fetch tests from Supabase
  useEffect(() => {
    fetchTests();
  }, []);

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

  async function createTest(title: string, content: string, subject: string) {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("User not authenticated");
        return;
      }

      const { error: insertError } = await supabase.from("tests").insert([
        {
          title,
          content,
          subject,
          authorid: user.id,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) throw insertError;

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
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn btn-sm btn-outline w-full gap-2"
                  >
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

            {error && (
              <div className="alert alert-error mb-4 rounded-lg p-3">
                <span className="text-sm">{error}</span>
              </div>
            )}

            <section className="bg-base-100 rounded-xl border p-4 shadow-sm transition hover:shadow-lg">
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
                        className="flex transform items-start gap-4 rounded-lg bg-white/60 p-3 transition hover:-translate-y-1 hover:scale-[1.01] hover:bg-white/70 hover:shadow-lg hover:ring-1 hover:ring-[#FF705B]/10"
                      >
                        <div className="avatar">
                          <div className="w-12 rounded">
                            <img
                              src={`https://i.pravatar.cc/80?u=${t.user_id}`}
                              alt="profile"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-semibold">{t.title}</div>
                              <div className="text-xs opacity-60">
                                {new Date(t.created_at).toLocaleDateString()}
                              </div>
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
                          {t.subject && (
                            <div className="mt-2">
                              <span className="badge badge-sm">
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
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn btn-sm"
                >
                  Create Test
                </button>
                <button className="btn btn-sm btn-outline">Export</button>
                <button className="btn btn-sm btn-ghost">Settings</button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Create Test Modal */}
      {showCreateModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="mb-4 text-lg font-bold">Create New Test</h3>

            <div className="form-control mb-3 w-full">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Test title..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-3 w-full">
              <label className="label">
                <span className="label-text">Subject</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Math, Physics..."
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-4 w-full">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                placeholder="Test content..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="textarea textarea-bordered h-32 w-full"
              />
            </div>

            <div className="modal-action">
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  createTest(formData.title, formData.content, formData.subject)
                }
                className="btn btn-primary"
              >
                Create
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
