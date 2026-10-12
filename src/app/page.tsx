
import Sidebar from "@/components/layout/Sidebar"; 
import Link from "next/link"; 
import {
  CheckCircle2, // Completed task icon
  Clock3, // time icon
  Flame, // Streak icon
  Plus, // Add button icon
  Sparkles, // Decorative icon
  BookOpen, // Study task icon
  Heart, // Self-care icon
  Dumbbell, // Exercise icon
  ArrowUpRight, // Upcoming task icon
} from "lucide-react"; // icons import

export default function DashboardPage() {
  // Dashboard-এর sample data; পরে এগুলো real data দিয়ে চালাব
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
    
    <main className="min-h-screen bg-[#faf7ff] p-4 md:p-6 lg:p-8">
      
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">

        <aside className="hidden lg:block">
          <div className="sticky top-6 h-[calc(100vh-48px)]">
            <Sidebar />
          </div>
        </aside>

        <section className="min-w-0 space-y-6">

         
          <header className="flex items-center justify-between lg:hidden">
            <Link href="/" className="text-2xl font-extrabold text-[#49365f]">
              🌸 bloom.
            </Link>
            <span className="text-sm text-[#897e99]">Your happy space</span>
          </header>

          <section className="overflow-hidden rounded-3xl bg-linear-to-br from-[#eee5ff] via-[#f4e8ff] to-[#fce8f0] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-[#8062cf]">
                  <Sparkles size={17} />
                  YOUR LITTLE PRODUCTIVITY SPACE
                </p>

                <h1 className="text-3xl font-extrabold leading-tight text-[#49365f] sm:text-4xl lg:text-5xl">
                  Make today <br className="sm:hidden" />
                  bloom! 🌷
                </h1>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#81708f] sm:text-base">
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

          {/* Statistics cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {/* Daily progress card */}
            <div className="rounded-3xl border border-[#eee7f6] bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#897e99]">
                  Daily progress
                </p>
                <span className="rounded-xl bg-[#eee5ff] p-2 text-[#8062cf]">
                  <CheckCircle2 size={21} />
                </span>
              </div>

              <div className="mt-4 flex items-end gap-2">
                <h2 className="text-3xl font-extrabold text-[#49365f]">
                  65%
                </h2>
                <p className="pb-1 text-xs text-[#a092b4]">
                  of your daily goal
                </p>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#f0eafa]">
                <div className="h-full w-[65%] rounded-full bg-[#a78bfa]" />
              </div>
            </div>

            {/* Completed tasks card */}
            <div className="rounded-3xl border border-[#eee7f6] bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#897e99]">
                  Tasks completed
                </p>
                <span className="rounded-xl bg-[#dff3e5] p-2 text-[#438761]">
                  <CheckCircle2 size={21} />
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold text-[#49365f]">
                8 <span className="text-lg text-[#b1a5c1]">/ 12</span>
              </h2>
              <p className="mt-2 text-xs text-[#a092b4]">
                Keep going, you’re doing great!
              </p>
            </div>

            {/* Streak card */}
            <div className="rounded-3xl border border-[#eee7f6] bg-white p-5 sm:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#897e99]">
                  Current streak
                </p>
                <span className="rounded-xl bg-[#fff0d5] p-2 text-[#d28a38]">
                  <Flame size={21} />
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold text-[#49365f]">
                5 days 🔥
              </h2>
              <p className="mt-2 text-xs text-[#a092b4]">
                Little habits, big changes.
              </p>
            </div>
          </section>

          {/* Today's routine list */}
          <section className="rounded-3xl border border-[#eee7f6] bg-white p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-[#49365f]">
                  Today’s routine ✨
                </h2>
                <p className="mt-1 text-sm text-[#a092b4]">
                  A little plan for a lovely day
                </p>
              </div>

              {/* Routine page-এ যাওয়ার button */}
              <a
                href="/routine"
                aria-label="Add a routine"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eee5ff] text-[#8062cf] transition hover:bg-[#e2d4ff]"
              >
                <Plus size={22} />
              </a>
            </div>

            
            <div className="space-y-3">
              {tasks.map((task) => {
                const Icon = task.icon; 

                return (
                  <div
                    key={task.title}
                    className="flex items-center gap-3 rounded-2xl border border-[#f1ecf7] p-3 transition hover:bg-[#fcfaff] sm:gap-4 sm:p-4"
                  >
                    {/* Task icon */}
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
                            : "text-[#49365f]"
                        }`}
                      >
                        {task.title}
                      </h3>

                      <p className="mt-1 flex items-center gap-1 text-xs text-[#a092b4]">
                        <Clock3 size={13} />
                        {task.time}
                      </p>
                    </div>

                    <span className="hidden rounded-full bg-[#faf7ff] px-3 py-1 text-xs font-bold text-[#897e99] sm:inline-block">
                      {task.category}
                    </span>

                   
                    <span
                      className={`h-5 w-5 shrink-0 rounded-full border-2 ${
                        task.done
                          ? "border-[#a78bfa] bg-[#a78bfa]"
                          : "border-[#d8cce8]"
                      }`}
                    >
                      {task.done && (
                        <CheckCircle2
                          size={16}
                          className="text-white"
                        />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Dashboard footer */}
          <footer className="pb-3 text-center text-xs text-[#b1a5c1]">
            Made with ♡ and a little bit of magic · Bloom Routine
          </footer>
        </section>
      </div>
    </main>
  );
}
