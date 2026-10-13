
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  UserRound,
  Bell,
  Palette,
  Save,
  Sprout,
} from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Saved settings load kori
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(localStorage.getItem("bloom-profile-name") || "");
      setTheme(localStorage.getItem("bloom-theme") || "light");

      const savedNotifications =
        localStorage.getItem("bloom-notifications");

      setNotifications(
        savedNotifications === null
          ? true
          : savedNotifications === "true"
      );
    } catch {
      toast.error("Settings load kora jayni!");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Settings save kori
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      localStorage.setItem("bloom-profile-name", name.trim());
      localStorage.setItem("bloom-theme", theme);
      localStorage.setItem(
        "bloom-notifications",
        String(notifications)
      );

      toast.success("Settings saved successfully! 🌸");
    } catch {
      toast.error("Settings save kora jayni!");
    }
  };

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf7]">
        <p className="animate-pulse text-[#a17c91]">
          Loading settings... 🌱
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-3xl">
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
            <Settings size={28} />
          </div>

          <h1 className="text-3xl font-bold text-[#514452] sm:text-4xl">
            Settings ⚙️
          </h1>

          <p className="mt-3 text-[#938393]">
            Customize your Bloom Routine experience.
          </p>
        </header>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile settings */}
          <section className="rounded-3xl border border-[#f1e5ed] bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3e6f1] text-[#a786a5]">
                <UserRound size={23} />
              </div>

              <div>
                <h2 className="font-bold text-[#514452]">
                  Profile
                </h2>
                <p className="text-sm text-[#a394a1]">
                  Personalize your profile name
                </p>
              </div>
            </div>

            <label
              htmlFor="profileName"
              className="mb-2 block text-sm font-medium text-[#655565]"
            >
              Your Name
            </label>

            <input
              id="profileName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-[#eadde7] bg-[#fffdfd] px-4 py-3 text-[#514452] outline-none focus:border-[#c5a2bd] focus:ring-2 focus:ring-[#f4e9f2]"
            />
          </section>

          {/* Appearance settings */}
          <section className="rounded-3xl border border-[#f1e5ed] bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0df] text-[#c39161]">
                <Palette size={23} />
              </div>

              <div>
                <h2 className="font-bold text-[#514452]">
                  Appearance
                </h2>
                <p className="text-sm text-[#a394a1]">
                  Choose your preferred theme
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`rounded-2xl border-2 p-4 text-left transition ${
                  theme === "light"
                    ? "border-[#b99ab5] bg-[#fff8fd]"
                    : "border-[#f1e5ed] hover:border-[#dec8dc]"
                }`}
              >
                <span className="mb-3 block text-2xl">☀️</span>
                <span className="font-semibold text-[#514452]">
                  Light
                </span>
                <span className="mt-1 block text-xs text-[#a394a1]">
                  Soft pastel colors
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`rounded-2xl border-2 p-4 text-left transition ${
                  theme === "dark"
                    ? "border-[#b99ab5] bg-[#f7eff5]"
                    : "border-[#f1e5ed] hover:border-[#dec8dc]"
                }`}
              >
                <span className="mb-3 block text-2xl">🌙</span>
                <span className="font-semibold text-[#514452]">
                  Dark
                </span>
                <span className="mt-1 block text-xs text-[#a394a1]">
                  Dark theme preference
                </span>
              </button>
            </div>

            {theme === "dark" && (
              <p className="mt-3 text-xs text-[#a394a1]">
                Dark preference save hobe, kintu full dark styling
                apply korte global theme support add korte hobe.
              </p>
            )}
          </section>

          {/* Notification settings */}
          <section className="rounded-3xl border border-[#f1e5ed] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f3df] text-[#809b76]">
                  <Bell size={23} />
                </div>

                <div>
                  <h2 className="font-bold text-[#514452]">
                    Notifications
                  </h2>
                  <p className="text-sm text-[#a394a1]">
                    Notification preference
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={notifications}
                aria-label="Toggle notifications"
                onClick={() =>
                  setNotifications((previous) => !previous)
                }
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  notifications ? "bg-[#a5bf99]" : "bg-[#d8cbd6]"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                    notifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            <p className="mt-4 text-xs text-[#a394a1]">
              {notifications
                ? "Notifications preference is enabled."
                : "Notifications preference is disabled."}
              {" "}Eta preference save kore; actual browser notifications
              ekhono implement kora hoyni.
            </p>
          </section>

          {/* Save button */}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#b99ab5] px-6 py-4 font-semibold text-white transition hover:bg-[#a888a3]"
          >
            <Save size={19} />
            Save Settings
          </button>
        </form>

        {/* Quick links */}
        <section className="mt-8 rounded-3xl border border-[#f1e5ed] bg-white p-6">
          <h2 className="mb-4 font-bold text-[#514452]">
            Quick Links
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Link
              href="/habits"
              className="rounded-xl bg-[#f4eaf2] p-4 text-center text-sm font-semibold text-[#927b8f] hover:bg-[#eddfeb]"
            >
              🌱 Habit Tracker
            </Link>

            <Link
              href="/focus"
              className="rounded-xl bg-[#eff5eb] p-4 text-center text-sm font-semibold text-[#809b76] hover:bg-[#e5efdf]"
            >
              ⏳ Focus Room
            </Link>

            <Link
              href="/analytics"
              className="rounded-xl bg-[#fff0df] p-4 text-center text-sm font-semibold text-[#b18458] hover:bg-[#ffe8d0]"
            >
              📊 Analytics
            </Link>
          </div>
        </section>

        <p className="mt-8 text-center text-sm text-[#b19eaf]">
          Make this little space feel like yours. 🌷
        </p>
      </div>
    </main>
  );
}
