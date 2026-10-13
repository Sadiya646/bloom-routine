
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Target,
  TrendingUp,
  Clock,
  Sprout,
} from "lucide-react";

type Habit = {
  id: number;
  name: string;
  completed: boolean;
};

export default function AnalyticsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [sessions, setSessions] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      // LocalStorage theke habits load kori
      const savedHabits = localStorage.getItem("bloom-habits");

      if (savedHabits) {
        const parsed: Habit[] = JSON.parse(savedHabits);

        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setHabits(parsed);
        }
      }

      // Focus sessions-er count load kori
      const savedSessions = localStorage.getItem("bloom-focus-sessions");

      if (savedSessions) {
        setSessions(Number(savedSessions) || 0);
      }
    } catch {
      // Data read korte problem hole empty state thakbe
      setHabits([]);
      setSessions(0);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;

  const completionRate =
    habits.length > 0
      ? Math.round((completedHabits / habits.length) * 100)
      : 0;

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf7]">
        <p className="animate-pulse text-[#a17c91]">
          Loading your analytics... 🌱
        </p>
      </main>
    );
  }

  const stats = [
    {
      title: "Total Habits",
      value: habits.length,
      icon: Sprout,
      color: "bg-[#f3e6f1] text-[#a786a5]",
    },
    {
      title: "Completed Today",
      value: completedHabits,
      icon: CheckCircle2,
      color: "bg-[#e5f3df] text-[#809b76]",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "bg-[#fff0df] text-[#c39161]",
    },
    {
      title: "Focus Sessions",
      value: sessions,
      icon: Target,
      color: "bg-[#e6efff] text-[#809ac4]",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Dashboard link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#96738b] hover:text-[#6f5265]"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Heading */}
        <header className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3e6f1] text-[#a786a5]">
            <BarChart3 size={29} />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#b58ba5]">
            Your personal growth
          </p>

          <h1 className="text-3xl font-bold text-[#514452] sm:text-4xl">
            Analytics 📊
          </h1>

          <p className="mt-3 text-[#938393]">
            See your progress and celebrate every small win.
          </p>
        </header>

        {/* Stats cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-3xl border border-[#f1e5ed] bg-white p-5 shadow-sm"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}
                >
                  <Icon size={24} />
                </div>

                <p className="text-sm text-[#a394a1]">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-[#514452]">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </section>

        {/* Habit progress */}
        <section className="mt-6 rounded-3xl border border-[#f1e5ed] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f3df] text-[#809b76]">
              <TrendingUp size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#514452]">
                Today&apos;s Habit Progress
              </h2>

              <p className="text-sm text-[#a394a1]">
                Your daily completion overview
              </p>
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-[#8f7c8c]">
              Overall progress
            </span>

            <span className="font-bold text-[#809b76]">
              {completionRate}%
            </span>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-[#f4edf2]">
            <div
              className="h-full rounded-full bg-[#a7c69a] transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>

          <p className="mt-4 text-sm text-[#a394a1]">
            {habits.length === 0
              ? "Add some habits in Habit Tracker to see your progress."
              : completionRate === 100
                ? "Wonderful! All your habits are complete today! 🎉"
                : `${completedHabits} out of ${habits.length} habits completed. Keep going! 🌸`}
          </p>
        </section>

        {/* Individual habit details */}
        <section className="mt-6 rounded-3xl border border-[#f1e5ed] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-5 text-lg font-bold text-[#514452]">
            Habit Breakdown
          </h2>

          {habits.length === 0 ? (
            <div className="py-8 text-center">
              <p className="mb-3 text-4xl">🌷</p>
              <p className="text-[#938393]">
                No habits found. Add habits to get started!
              </p>

              <Link
                href="/habits"
                className="mt-4 inline-flex rounded-xl bg-[#b99ab5] px-5 py-3 font-semibold text-white hover:bg-[#a888a3]"
              >
                Go to Habit Tracker
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {habits.map((habit) => (
                <div key={habit.id}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="break-words text-sm font-medium text-[#655565]">
                      {habit.name}
                    </span>

                    <span
                      className={`shrink-0 text-xs font-semibold ${
                        habit.completed
                          ? "text-[#809b76]"
                          : "text-[#b19eaf]"
                      }`}
                    >
                      {habit.completed ? "Completed ✓" : "Pending"}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#f4edf2]">
                    <div
                      className={`h-full rounded-full transition-all ${
                        habit.completed
                          ? "bg-[#a7c69a]"
                          : "bg-[#e8dce7]"
                      }`}
                      style={{
                        width: habit.completed ? "100%" : "0%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Focus sessions information */}
        <section className="mt-6 rounded-3xl border border-[#f1e5ed] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e6efff] text-[#809ac4]">
              <Clock size={25} />
            </div>

            <div>
              <h2 className="font-bold text-[#514452]">
                Focus Room Summary
              </h2>

              <p className="mt-1 text-sm text-[#a394a1]">
                {sessions} completed focus sessions recorded.
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-[#938393]">
            Focus session history will appear here as you track your
            sessions.
          </p>

          <Link
            href="/focus"
            className="mt-4 inline-flex rounded-xl bg-[#b99ab5] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a888a3]"
          >
            Open Focus Room
          </Link>
        </section>

        <p className="mt-8 text-center text-sm text-[#b19eaf]">
          Every little step is part of your growth. Keep blooming! 🌸
        </p>
      </div>
    </main>
  );
}
