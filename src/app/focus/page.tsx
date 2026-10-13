
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Timer,
  Coffee,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
const SESSION_KEY = "bloom-focus-sessions";

export default function FocusPage() {
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  // Age save kora focus session count load kori
  useEffect(() => {
    try {
      const savedSessions = localStorage.getItem(SESSION_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSessions(
        savedSessions ? Math.max(0, Number(savedSessions) || 0) : 0
      );
    } catch {
      toast.error("Session data load kora jayni!");
    }
  }, []);

  // Timer countdown handle kori
  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          setIsRunning(false);

          if (!isBreak) {
            // Focus session shesh hole count save kori
            setSessions((count) => {
              const updatedCount = count + 1;

              try {
                localStorage.setItem(
                  SESSION_KEY,
                  String(updatedCount)
                );
              } catch {
                toast.error("Session count save kora jayni!");
              }

              return updatedCount;
            });

            toast.success("Focus session complete! Great job 🌸");
          } else {
            toast.success("Break finished! Ready to focus? 🌱");
          }

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, isBreak]);

  // Seconds ke MM:SS format-e convert kori
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // Timer start kori
  const handleStart = () => {
    if (secondsLeft === 0) {
      toast("Timer reset kore abar start koro 🌷");
      return;
    }

    setIsRunning(true);
  };

  // Timer pause kori
  const handlePause = () => {
    setIsRunning(false);
  };

  // Current timer reset kori
  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(isBreak ? BREAK_TIME : FOCUS_TIME);
    toast.success("Timer reset hoyeche!");
  };

  // Focus ebong break mode change kori
  const handleModeChange = (breakMode: boolean) => {
    setIsRunning(false);
    setIsBreak(breakMode);
    setSecondsLeft(breakMode ? BREAK_TIME : FOCUS_TIME);
  };

  const totalTime = isBreak ? BREAK_TIME : FOCUS_TIME;
  const progress = ((totalTime - secondsLeft) / totalTime) * 100;

  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Dashboard link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#96738b] transition hover:text-[#6f5265]"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Page heading */}
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f3e6f1] text-[#a786a5]">
            <Timer size={32} />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#b58ba5]">
            Your peaceful corner
          </p>

          <h1 className="text-3xl font-bold text-[#514452] sm:text-4xl">
            Focus Room 🌸
          </h1>

          <p className="mt-3 text-[#938393]">
            Focus on one thing at a time. You are doing great!
          </p>
        </header>

        {/* Timer card */}
        <section className="rounded-3xl border border-[#f1e5ed] bg-white px-5 py-8 shadow-sm sm:px-10 sm:py-10">
          {/* Focus / Break mode */}
          <div className="mb-8 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => handleModeChange(false)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                !isBreak
                  ? "bg-[#b99ab5] text-white shadow-sm"
                  : "bg-[#f7eff5] text-[#9b8198] hover:bg-[#f0e3ee]"
              }`}
            >
              <Timer size={17} />
              Focus
            </button>

            <button
              type="button"
              onClick={() => handleModeChange(true)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                isBreak
                  ? "bg-[#a5bf99] text-white shadow-sm"
                  : "bg-[#eff5eb] text-[#809b76] hover:bg-[#e5efdf]"
              }`}
            >
              <Coffee size={17} />
              Short Break
            </button>
          </div>

          {/* Circular timer */}
          <div className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 200 200"
              aria-hidden="true"
            >
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="#f4edf2"
                strokeWidth="7"
              />

              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke={isBreak ? "#a5bf99" : "#c3a2c0"}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={
                  2 * Math.PI * 88 * (1 - progress / 100)
                }
                className="transition-all duration-1000"
              />
            </svg>

            <div className="text-center">
              <p className="mb-2 text-sm font-medium text-[#a394a1]">
                {isBreak ? "Time to recharge" : "Time to focus"}
              </p>

              <p className="text-5xl font-bold tracking-tight text-[#514452] sm:text-6xl">
                {formatTime(secondsLeft)}
              </p>

              <p className="mt-3 text-sm text-[#b19eaf]">
                {isRunning
                  ? "You're doing amazing ✨"
                  : "Take it at your pace"}
              </p>
            </div>
          </div>

          {/* Start / Pause / Reset */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {!isRunning ? (
              <button
                type="button"
                onClick={handleStart}
                disabled={secondsLeft === 0}
                className="inline-flex min-w-36 items-center justify-center gap-2 rounded-xl bg-[#b99ab5] px-6 py-3 font-semibold text-white transition hover:bg-[#a888a3] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Play size={19} fill="currentColor" />
                Start
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePause}
                className="inline-flex min-w-36 items-center justify-center gap-2 rounded-xl bg-[#b99ab5] px-6 py-3 font-semibold text-white transition hover:bg-[#a888a3]"
              >
                <Pause size={19} fill="currentColor" />
                Pause
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#eadde7] bg-white px-5 py-3 font-semibold text-[#927b8f] transition hover:bg-[#fff8fd]"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>

          {/* Timer complete hole next action */}
          {secondsLeft === 0 && (
            <div className="mt-6 text-center">
              <p className="mb-3 text-sm text-[#8e7c8b]">
                {isBreak
                  ? "Break complete! Ready for another focus session?"
                  : "You completed a focus session. Time for a little break!"}
              </p>

              <button
                type="button"
                onClick={() => handleModeChange(!isBreak)}
                className="font-semibold text-[#a786a5] underline underline-offset-4"
              >
                {isBreak ? "Start Focus Session" : "Take a Short Break"}
              </button>
            </div>
          )}
        </section>

        {/* Session counter */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-[#f1e5ed] bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3e6f1] text-[#a786a5]">
              <CheckCircle2 size={25} />
            </div>

            <div>
              <p className="text-sm text-[#a394a1]">
                Completed Focus Sessions
              </p>
              <p className="mt-1 text-2xl font-bold text-[#514452]">
                {sessions}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[#f1e5ed] bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff5eb] text-[#809b76]">
              <Coffee size={25} />
            </div>

            <div>
              <p className="text-sm text-[#a394a1]">Focus Duration</p>
              <p className="mt-1 text-2xl font-bold text-[#514452]">
                25 minutes
              </p>
            </div>
          </div>
        </section>

        {/* Footer message */}
        <p className="mt-8 text-center text-sm text-[#b19eaf]">
          Small progress is still progress. Keep blooming! 🌷
        </p>
      </div>
    </main>
  );
}
