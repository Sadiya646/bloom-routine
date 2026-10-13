
"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  Flame,
  Plus,
  Sparkles,
  BookOpen,
  Heart,
  Dumbbell,
  ArrowUpRight,
  Sun,
  Moon,
} from "lucide-react";

export default function DashboardPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("bloom-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(savedTheme);
      document.documentElement.classList.toggle(
        "dark",
        savedTheme === "dark"
      );
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("bloom-theme", newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );
  };

  const tasks = [
    {
      title: "Morning study session",
      time: "09:00 AM – 10:00 AM",
      category: "Study",
      icon: BookOpen,
      color: "bg-[#eee5ff]",
      iconColor: "text-[#8062cf]",
      done: true,
    },
    {
      title: "Morning workout",
      time: "10:30 AM – 11:00 AM",
      category: "Health",
      icon: Dumbbell,
      color: "bg-[#dff3e5]",
      iconColor: "text-[#438761]",
      done: false,
    },
    {
      title: "Self-care break",
      time: "12:00 PM – 12:30 PM",
      category: "Personal",
      icon: Heart,
      color: "bg-[#f8dce8]",
      iconColor: "text-[#c16d91]",
      done: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf7ff] p-4 text-[#49365f] transition-colors duration-300 dark:bg-[#171521] dark:text-[#f5edf7] md:p-6 lg:p-8">
      <div className="mx-auto grid max-w-360 grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 h-[calc(100vh-48px)]">
            <Sidebar />
          </div>
        </aside>

        <section className="min-w-0 space-y-6">
          {/* Mobile header */}
          <header className="flex items-center justify-between gap-3 lg:hidden">
            <Link
              href="/"
              className="text-2xl font-extrabold text-[#49365f] dark:text-[#f5edf7]"
            >
              🌸 bloom.
            </Link>

            <span className="hidden text-sm text-[#897e99] sm:inline">
              Your happy space
            </span>

            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="flex shrink-0 items-center gap-2 rounded-xl border border-[#eee7f6] bg-white px-3 py-2 text-sm font-bold text-[#49365f] shadow-sm transition hover:scale-105 dark:border-[#40374b] dark:bg-[#242130] dark:text-[#f5edf7]"
            >
              {theme === "light" ? (
                <>
                  <Moon size={17} />
                  Dark
                </>
              ) : (
                <>
                  <Sun size={17} />
                  Light
                </>
              )}
            </button>
          </header>

          {/* Hero */}
          <section className="overflow-hidden rounded-3xl bg-linear-to-br from-[#eee5ff] via-[#f4e8ff] to-[#fce8f0] p-6 dark:from-[#302640] dark:via-[#302438] dark:to-[#3a2638] sm:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <p className="flex items-center gap-2 text-sm font-bold text-[#8062cf] dark:text-[#d3b9ff]">
                    <Sparkles size={17} />
                    YOUR LITTLE PRODUCTIVITY SPACE
                  </p>

                  {/* Desktop theme toggle */}
                  <button
                    onClick={toggleTheme}
                    aria-label="Toggle color theme"
                    className="hidden items-center gap-2 rounded-xl border border-[#e5d9f1] bg-white/80 px-3 py-2 text-xs font-bold text-[#49365f] shadow-sm transition hover:scale-105 dark:border-[#51435f] dark:bg-[#242130] dark:text-[#f5edf7] sm:inline-flex"
                  >
                    {theme === "light" ? (
                      <>
                        <Moon size={16} />
                        Dark Mode
                      </>
                    ) : (
                      <>
                        <Sun size={16} />
                        Light Mode
                      </>
                    )}
                  </button>
                </div>

                <h1 className="text-3xl font-extrabold leading-tight text-[#49365f] dark:text-[#f5edf7] sm:text-4xl lg:text-5xl">
                  Make today <br className="sm:hidden" />
                  bloom! 🌷
                </h1>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#81708f] dark:text-[#c3b5ca] sm:text-base">
                  Small steps, lovely progress. Let’s make today count.
                </p>

                <Link
                  href="/routine"
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#a78bfa] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#8062cf]"
                >
                  Plan my day <ArrowUpRight size={17} />
                </Link>
              </div>

              <div className="hidden h-36 w-36 shrink-0 items-center justify-center rounded-full bg-white/50 text-7xl sm:flex lg:h-44 lg:w-44 lg:text-8xl">
                🌼
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {/* Daily progress */}
            <div className="rounded-3xl border border-[#eee7f6] bg-white p-5 transition-colors dark:border-[#40374b] dark:bg-[#242130]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#897e99] dark:text-[#c3b5ca]">
                  Daily progress
                </p>
                <span className="rounded-xl bg-[#eee5ff] p-2 text-[#8062cf]">
                  <CheckCircle2 size={21} />
                </span>
              </div>

              <div className="mt-4 flex items-end gap-2">
                <h2 className="text-3xl font-extrabold text-[#49365f] dark:text-[#f5edf7]">
                  65%
                </h2>
                <p className="pb-1 text-xs text-[#a092b4]">
                  of your daily goal
                </p>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f0eafa] dark:bg-[#40374b]">
                <div className="h-full w-[65%] rounded-full bg-[#a78bfa]" />
              </div>
            </div>

            {/* Completed tasks */}
            <div className="rounded-3xl border border-[#eee7f6] bg-white p-5 transition-colors dark:border-[#40374b] dark:bg-[#242130]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#897e99] dark:text-[#c3b5ca]">
                  Tasks completed
                </p>
                <span className="rounded-xl bg-[#dff3e5] p-2 text-[#438761]">
                  <CheckCircle2 size={21} />
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold text-[#49365f] dark:text-[#f5edf7]">
                8 <span className="text-lg text-[#b1a5c1]">/ 12</span>
              </h2>

              <p className="mt-2 text-xs text-[#a092b4]">
                Keep going, you’re doing great!
              </p>
            </div>

            {/* Streak */}
            <div className="rounded-3xl border border-[#eee7f6] bg-white p-5 transition-colors dark:border-[#40374b] dark:bg-[#242130] sm:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#897e99] dark:text-[#c3b5ca]">
                  Current streak
                </p>
                <span className="rounded-xl bg-[#fff0d5] p-2 text-[#d28a38]">
                  <Flame size={21} />
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold text-[#49365f] dark:text-[#f5edf7]">
                5 days 🔥
              </h2>

              <p className="mt-2 text-xs text-[#a092b4]">
                Little habits, big changes.
              </p>
            </div>
          </section>

          {/* Today's routine */}
          <section className="rounded-3xl border border-[#eee7f6] bg-white p-5 transition-colors dark:border-[#40374b] dark:bg-[#242130] sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-[#49365f] dark:text-[#f5edf7]">
                  Today’s routine ✨
                </h2>
                <p className="mt-1 text-sm text-[#a092b4]">
                  A little plan for a lovely day
                </p>
              </div>

              <Link
                href="/routine"
                aria-label="Add a routine"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eee5ff] text-[#8062cf] transition hover:bg-[#e2d4ff]"
              >
                <Plus size={22} />
              </Link>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => {
                const Icon = task.icon;

                return (
                  <div
                    key={task.title}
                    className="flex items-center gap-3 rounded-2xl border border-[#f1ecf7] p-3 transition hover:bg-[#fcfaff] dark:border-[#40374b] dark:hover:bg-[#302a3d] sm:gap-4 sm:p-4"
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${task.color} ${task.iconColor}`}
                    >
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className={`truncate text-sm font-extrabold ${
                          task.done
                            ? "text-[#a092b4] line-through"
                            : "text-[#49365f] dark:text-[#f5edf7]"
                        }`}
                      >
                        {task.title}
                      </h3>

                      <p className="mt-1 flex items-center gap-1 text-xs text-[#a092b4]">
                        <Clock3 size={13} />
                        {task.time}
                      </p>
                    </div>

                    <span className="hidden rounded-full bg-[#faf7ff] px-3 py-1 text-xs font-bold text-[#897e99] dark:bg-[#302a3d] dark:text-[#c3b5ca] sm:inline-block">
                      {task.category}
                    </span>

                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        task.done
                          ? "border-[#a78bfa] bg-[#a78bfa]"
                          : "border-[#d8cce8] dark:border-[#665675]"
                      }`}
                    >
                      {task.done && (
                        <CheckCircle2 size={16} className="text-white" />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Footer */}
          <footer className="pb-3 text-center text-xs text-[#b1a5c1]">
            Made with ♡ and a little bit of magic · Bloom Routine
          </footer>
        </section>
      </div>
    </main>
  );
}
