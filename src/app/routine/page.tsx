
"use client"; // Ei page-e user interaction thakbe

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Clock3,
  Trash2,
  Check,
  ArrowLeft,
  CalendarDays,
} from "lucide-react";
import toast from "react-hot-toast";

// Prottekta routine task-er data structure
type Task = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  category: string;
  priority: string;
  completed: boolean;
};

// Shurute dekhano sample task
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Morning study session",
    startTime: "09:00",
    endTime: "10:00",
    category: "Study",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Exercise",
    startTime: "10:30",
    endTime: "11:00",
    category: "Health",
    priority: "Medium",
    completed: false,
  },
];

export default function RoutinePage() {
  // Task list ebong form-er input manage korchi
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [category, setCategory] = useState("Study");
  const [priority, setPriority] = useState("Medium");

  // LocalStorage theke data load hoyeche kina track korchi
  const [isLoaded, setIsLoaded] = useState(false);

  // Browser-er LocalStorage theke saved task load korchi
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("bloom-routine-tasks");

      if (savedTasks !== null) {
        const parsedTasks: unknown = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setTasks(parsedTasks as Task[]);
        } else {
          setTasks(initialTasks);
        }
      } else {
        setTasks(initialTasks);
      }
    } catch {
      // Saved data read korte problem hole sample task dekhabo
      setTasks(initialTasks);
      toast.error("Saved routine load kora jayni!");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Task list change hole LocalStorage-e save korchi
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem("bloom-routine-tasks", JSON.stringify(tasks));
    } catch {
      toast.error("Routine save kora jayni!");
    }
  }, [tasks, isLoaded]);

  // Notun task add korar function
  function addTask() {
    // Task-er naam na dile error toast dekhabe
    if (!title.trim()) {
      toast.error("Please enter a task name! 🌸");
      return;
    }

    // End time, start time-er pore hote hobe
    if (endTime <= startTime) {
      toast.error("End time must be after start time! ⏰");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      startTime,
      endTime,
      category,
      priority,
      completed: false,
    };

    // Notun task add kore time onujayi sort korchi
    setTasks((previousTasks) =>
      [...previousTasks, newTask].sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      )
    );

    toast.success("Yay! Task added to your routine 🌷");

    // Task add howar por form reset korchi
    setTitle("");
    setStartTime("09:00");
    setEndTime("10:00");
    setCategory("Study");
    setPriority("Medium");
  }

  // Task complete ba incomplete korar function
  function toggleTask(id: number) {
    const selectedTask = tasks.find((task) => task.id === id);

    // Incomplete task complete korle success toast dekhabe
    if (selectedTask && !selectedTask.completed) {
      toast.success("Great job! Task completed ✨");
    }

    // Task-er completed status ulte dicchi
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Task delete korar function
  function deleteTask(id: number) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );

    toast.success("Task deleted successfully! 🗑️");
  }

  // Koyta task complete hoyeche count korchi
  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  // Daily progress percentage ber korchi
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  return (
    <main className="min-h-screen bg-[#faf7ff] p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Dashboard-e ferot jawar link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#8062cf] hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* Page title ebong description */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-2xl bg-[#eee5ff] p-3 text-[#8062cf]">
              <CalendarDays size={27} />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-[#49365f] sm:text-4xl">
                My Routine 🌷
              </h1>
              <p className="mt-1 text-sm text-[#897e99]">
                Build a routine that works for you.
              </p>
            </div>
          </div>
        </header>

        {/* Daily progress card */}
        <section className="mb-6 rounded-3xl border border-[#eee7f6] bg-white p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-extrabold text-[#49365f]">
                Your daily progress
              </h2>
              <p className="mt-1 text-sm text-[#897e99]">
                {completedCount} of {tasks.length} tasks completed
              </p>
            </div>

            <span className="text-2xl font-extrabold text-[#8062cf]">
              {progress}%
            </span>
          </div>

          {/* Progress percentage onujayi bar-er width change hobe */}
          <div className="h-3 overflow-hidden rounded-full bg-[#f0eafa]">
            <div
              className="h-full rounded-full bg-[#a78bfa] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Notun task add korar form */}
        <section className="mb-6 rounded-3xl border border-[#eee7f6] bg-white p-5 sm:p-7">
          <h2 className="mb-5 flex items-center gap-2 text-xl font-extrabold text-[#49365f]">
            <Plus size={22} className="text-[#8062cf]" />
            Add a new task
          </h2>

          <form
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              addTask();
            }}
          >
            {/* Task-er naam */}
            <div className="sm:col-span-2">
              <label
                htmlFor="taskTitle"
                className="mb-2 block text-sm font-bold text-[#68577c]"
              >
                Task name
              </label>

              <input
                id="taskTitle"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Complete React practice"
                className="w-full rounded-xl border border-[#e9e0f2] bg-[#fdfbff] px-4 py-3 text-sm outline-none transition focus:border-[#a78bfa]"
                required
              />
            </div>

            {/* Task shurur time */}
            <div>
              <label
                htmlFor="startTime"
                className="mb-2 block text-sm font-bold text-[#68577c]"
              >
                Start time
              </label>

              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="w-full rounded-xl border border-[#e9e0f2] bg-[#fdfbff] px-4 py-3 text-sm outline-none focus:border-[#a78bfa]"
                required
              />
            </div>

            {/* Task shesh howar time */}
            <div>
              <label
                htmlFor="endTime"
                className="mb-2 block text-sm font-bold text-[#68577c]"
              >
                End time
              </label>

              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                className="w-full rounded-xl border border-[#e9e0f2] bg-[#fdfbff] px-4 py-3 text-sm outline-none focus:border-[#a78bfa]"
                required
              />
            </div>

            {/* Task category select korar option */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-bold text-[#68577c]"
              >
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-[#e9e0f2] bg-[#fdfbff] px-4 py-3 text-sm outline-none focus:border-[#a78bfa]"
              >
                <option>Study</option>
                <option>Work</option>
                <option>Health</option>
                <option>Personal</option>
                <option>Other</option>
              </select>
            </div>

            {/* Task priority select korar option */}
            <div>
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-bold text-[#68577c]"
              >
                Priority
              </label>

              <select
                id="priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                className="w-full rounded-xl border border-[#e9e0f2] bg-[#fdfbff] px-4 py-3 text-sm outline-none focus:border-[#a78bfa]"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Submit korle notun task add hobe */}
            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#a78bfa] px-5 py-3 font-extrabold text-white transition hover:bg-[#8062cf] sm:col-span-2"
            >
              <Plus size={19} />
              Add to my routine
            </button>
          </form>
        </section>

        {/* Shob routine task-er list */}
        <section className="rounded-3xl border border-[#eee7f6] bg-white p-5 sm:p-7">
          <div className="mb-5">
            <h2 className="text-xl font-extrabold text-[#49365f]">
              Today&apos;s schedule ✨
            </h2>
            <p className="mt-1 text-sm text-[#897e99]">
              Check off each little accomplishment.
            </p>
          </div>

          <div className="space-y-3">
            {!isLoaded ? (
              // LocalStorage theke data load howa porjonto loading
              <div className="rounded-2xl bg-[#faf7ff] px-4 py-10 text-center text-sm text-[#897e99]">
                Loading your routine... 🌷
              </div>
            ) : tasks.length === 0 ? (
              // Task na thakle empty state
              <div className="rounded-2xl bg-[#faf7ff] px-4 py-10 text-center">
                <p className="text-3xl">🌱</p>
                <p className="mt-2 font-bold text-[#68577c]">
                  Your routine is empty!
                </p>
                <p className="mt-1 text-sm text-[#a092b4]">
                  Add a task above to get started.
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 rounded-2xl border border-[#f1ecf7] p-3 sm:gap-4 sm:p-4"
                >
                  {/* Click korle task complete status change hobe */}
                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    aria-label={
                      task.completed
                        ? "Mark task incomplete"
                        : "Mark task complete"
                    }
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                      task.completed
                        ? "border-[#a78bfa] bg-[#a78bfa] text-white"
                        : "border-[#d8cce8] text-transparent"
                    }`}
                  >
                    <Check size={16} />
                  </button>

                  {/* Task title, time, category ebong priority */}
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`wrap-break-word text-sm font-extrabold ${
                        task.completed
                          ? "text-[#a092b4] line-through"
                          : "text-[#49365f]"
                      }`}
                    >
                      {task.title}
                    </h3>

                    <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#a092b4]">
                      <span className="inline-flex items-center gap-1">
                        <Clock3 size={13} />
                        {task.startTime} – {task.endTime}
                      </span>
                      <span>· {task.category}</span>
                      <span>· {task.priority} priority</span>
                    </p>
                  </div>

                  {/* Click korle task delete hobe */}
                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                    className="shrink-0 rounded-xl p-2 text-[#c0afcf] transition hover:bg-[#fce8f0] hover:text-[#c16d91]"
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Page-er bottom text */}
        <p className="py-6 text-center text-xs text-[#b1a5c1]">
          Made with ♡ · One little step at a time
        </p>
      </div>
    </main>
  );
}
