

"use client"; // এই component-এ client-side interaction ব্যবহারের জন্য

import Link from "next/link"; // এক page থেকে অন্য page-এ যাওয়ার জন্য Next.js Link
import { usePathname } from "next/navigation"; // বর্তমানে কোন page-এ আছি তা জানার জন্য
import {
  LayoutDashboard, // Dashboard icon
  CalendarDays, // Routine calendar icon
  Sprout, // Habit tracker icon
  Timer, // Focus timer icon
  ChartNoAxesCombined, // Analytics icon
  Settings, // Settings icon
  Sparkles, // Decorative sparkle icon
  Heart, // Decorative heart icon
} from "lucide-react"; // Lucide থেকে icons নেওয়া হচ্ছে

// Sidebar-এর প্রতিটি menu-এর নাম, link ও icon এক জায়গায় রাখা হয়েছে
const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "My Routine",
    href: "/routine",
    icon: CalendarDays,
  },
  {
    name: "Habit Tracker",
    href: "/habits",
    icon: Sprout,
  },
  {
    name: "Focus Room",
    href: "/focus",
    icon: Timer,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  // বর্তমানে খোলা page-এর URL পাওয়া হচ্ছে
  const pathname = usePathname();

  return (
    // Sidebar-এর মূল container
    <aside className="flex h-full w-full flex-col rounded-3xl border border-[#eee7f6] bg-white p-5">

      {/* Logo এবং website-এর নাম */}
      <Link href="/" className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eee5ff]">
          <Sprout size={27} className="text-[#8062cf]" />
        </div>

        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#49365f]">
            bloom.
          </h1>
          <p className="text-[10px] font-bold tracking-[2px] text-[#a092b4]">
            YOUR HAPPY SPACE
          </p>
        </div>
      </Link>

      {/* Navigation section-এর heading */}
      <p className="mb-3 px-3 text-xs font-extrabold uppercase tracking-widest text-[#b1a5c1]">
        Workspace
      </p>

      {/* সব menu item loop করে দেখানো হচ্ছে */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          // প্রতিটি menu-এর icon component নেওয়া হচ্ছে
          const Icon = item.icon;

          // URL মিললে menu-টিকে active হিসেবে দেখানো হবে
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href} // React-কে প্রতিটি item আলাদাভাবে চিনতে সাহায্য করে
              href={item.href} // ক্লিক করলে যে page-এ যাবে
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                isActive
                  ? "bg-[#eee5ff] font-extrabold text-[#7656bd]" // Active menu-এর রং
                  : "font-semibold text-[#897e99] hover:bg-[#faf7ff] hover:text-[#7656bd]" // অন্য menu-এর রং
              }`}
            >
              {/* Menu-এর icon */}
              <Icon size={20} />

              {/* Menu-এর নাম */}
              <span className="text-sm">{item.name}</span>

              {/* Active menu-তে ছোট indicator */}
              {isActive && (
                <span className="ml-auto h-2 w-2 rounded-full bg-[#a78bfa]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar-এর নিচে ছোট decorative card */}
      <div className="mt-auto pt-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#f0e7ff] to-[#fce8f0] p-4">
          <div className="mb-3 flex items-center justify-between">
            <Sparkles size={22} className="text-[#8b69c8]" />
            <Heart size={18} className="text-[#d989ae]" />
          </div>

          <h2 className="text-sm font-extrabold text-[#59426f]">
            Little steps matter!
          </h2>

          <p className="mt-1 text-xs leading-5 text-[#81708f]">
            Small progress every day adds up to big changes.
          </p>
        </div>

        {/* Footer text */}
        <p className="mt-4 text-center text-xs text-[#b1a5c1]">
          Made with ♡ by Bloom
        </p>
      </div>
    </aside>
  );
}
