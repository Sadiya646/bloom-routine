
"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Plus,
  Trash2,
  Sprout,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

// Prottekta habit-er data structure
type Habit = {
  id: number;
  name: string;
  completed: boolean;
};

// Prothom bar page open korle ei default habit-gulo dekhabe
const defaultHabits: Habit[] = [
  {
    id: 1,
    name: "Drink 8 glasses of water 💧",
    completed: false,
  },
  {
    id: 2,
    name: "Exercise for 30 minutes 🏃‍♀️",
    completed: false,
  },
  {
    id: 3,
    name: "Read for 20 minutes 📚",
    completed: false,
  },
  {
    id: 4,
    name: "Study for 2 hours 📖",
    completed: false,
  },
  {
    id: 5,
    name: "Sleep on time 😴",
    completed: false,
  },
];

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitName, setHabitName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // LocalStorage theke saved habit load korchi
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bloom-habits");

      if (saved !== null) {
        const parsed: unknown = JSON.parse(saved);

        // Saved data array hole seta use korbo
        if (Array.isArray(parsed)) {
          // Empty array save thakleo default habit abar add korbo
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setHabits(
            parsed.length > 0
              ? (parsed as Habit[])
              : defaultHabits
          );
        } else {
          setHabits(defaultHabits);
        }
      } else {
        // Age kono habit save na thakle default habit set korchi
        setHabits(defaultHabits);
      }
    } catch {
      setHabits(defaultHabits);
      toast.error("Habits load kora jayni!");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Habit list change hole LocalStorage-e save korchi
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem("bloom-habits", JSON.stringify(habits));
    } catch {
      toast.error("Habits save kora jayni!");
    }
  }, [habits, isLoaded]);

  // Notun habit add korchi
  function addHabit() {
    if (!habitName.trim()) {
      toast.error("Please enter a habit name! 🌸");
      return;
    }

    const newHabit: Habit = {
      id: Date.now(),
      name: habitName.trim(),
      completed: false,
    };

    setHabits((previous) => [...previous, newHabit]);
    setHabitName("");

    toast.success("New habit added! 🌱");
  }

  // Habit complete ba incomplete korchi
  function toggleHabit(id: number) {
    const selected = habits.find((habit) => habit.id === id);

    if (selected && !selected.completed) {
      toast.success("Amazing! Keep growing ✨");
    }

    setHabits((previous) =>
      previous.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  }

  // Habit delete korchi
  function deleteHabit(id: number) {
    setHabits((previous) =>
      previous.filter((habit) => habit.id !== id)
    );

    toast.success("Habit deleted successfully! 🗑️");
  }

  // Completed habit count korchi
  const completedCount = habits.filter(
    (habit) => habit.completed
  ).length;

  // Daily progress percentage ber korchi
  const progress =
    habits.length === 0
      ? 0
      : Math.round((completedCount / habits.length) * 100);

  return (
    <main className="min-h-screen bg-[#faf7ff] p-4 sm:p-8">
      <div className="mx-auto max-w-3xl">

        {/* Dashboard-e ferot jawar link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#8062cf] hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Page title */}
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#eee5ff] p-3 text-[#8062cf]">
              <Sprout size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-[#49365f]">
                Habit Tracker 🌱
              </h1>

              <p className="mt-1 text-sm text-[#897e99]">
                Small habits, big changes.
              </p>
            </div>
          </div>
        </header>

        {/* Daily progress card */}
        <section className="mb-6 rounded-3xl border border-[#eee7f6] bg-white p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-extrabold text-[#49365f]">
                Today&apos;s progress
              </h2>

              <p className="mt-1 text-sm text-[#897e99]">
                {completedCount} of {habits.length} habits completed
              </p>
            </div>

            <span className="text-2xl font-extrabold text-[#8062cf]">
              {progress}%
            </span>
          </div>

          {/* Progress percentage onujayi bar change hobe */}
          <div className="h-3 overflow-hidden rounded-full bg-[#f0eafa]">
            <div
              className="h-full rounded-full bg-[#a78bfa] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Notun habit add korar form */}
        <form
          className="mb-6 flex flex-col gap-3 rounded-3xl border border-[#eee7f6] bg-white p-5 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            addHabit();
          }}
        >
          <input
            value={habitName}
            onChange={(event) => setHabitName(event.target.value)}
            placeholder="e.g. Drink water every morning"
            aria-label="Habit name"
            className="min-w-0 flex-1 rounded-xl border border-[#e9e0f2] bg-[#fdfbff] px-4 py-3 text-sm outline-none focus:border-[#a78bfa]"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#a78bfa] px-5 py-3 font-bold text-white transition hover:bg-[#8062cf]"
          >
            <Plus size={18} />
            Add Habit
          </button>
        </form>

        {/* Habit list */}
        <section className="space-y-3">
          {!isLoaded ? (
            <div className="rounded-2xl bg-white p-8 text-center text-sm text-[#897e99]">
              Loading habits... 🌷
            </div>
          ) : habits.length === 0 ? (
            <div className="rounded-3xl border border-[#eee7f6] bg-white px-5 py-10 text-center">
              <p className="text-3xl">🌼</p>

              <p className="mt-2 font-bold text-[#49365f]">
                No habits yet
              </p>

              <p className="mt-1 text-sm text-[#897e99]">
                Add your first habit and start growing!
              </p>
            </div>
          ) : (
            habits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center gap-3 rounded-2xl border border-[#eee7f6] bg-white p-4"
              >
                {/* Habit complete button */}
                <button
                  type="button"
                  onClick={() => toggleHabit(habit.id)}
                  aria-label={
                    habit.completed
                      ? "Mark habit incomplete"
                      : "Mark habit complete"
                  }
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition ${
                    habit.completed
                      ? "border-[#a78bfa] bg-[#a78bfa] text-white"
                      : "border-[#d8cce8] text-transparent"
                  }`}
                >
                  <Check size={16} />
                </button>

                {/* Habit name */}
                <span
                  className={`flex-1 break-words text-sm font-bold ${
                    habit.completed
                      ? "text-[#a092b4] line-through"
                      : "text-[#49365f]"
                  }`}
                >
                  {habit.name}
                </span>

                {/* Habit delete button */}
                <button
                  type="button"
                  onClick={() => deleteHabit(habit.id)}
                  aria-label={`Delete ${habit.name}`}
                  className="shrink-0 rounded-xl p-2 text-[#c0afcf] transition hover:bg-[#fce8f0] hover:text-[#c16d91]"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </section>

        {/* Bottom text */}
        <p className="py-6 text-center text-xs text-[#b1a5c1]">
          Made with ♡ · One little step at a time
        </p>
      </div>
    </main>
  );
}
