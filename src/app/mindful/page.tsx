
"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import {
  Music2,
  Play,
  Pause,
  Volume2,
  Wind,
  Sparkles,
  Heart,
  Smile,
  CheckCircle2,
  RotateCcw,
  Trash2,
  BookHeart,
} from "lucide-react";

const musicTracks = [
  {
    title: "Gentle Rain",
    category: "Nature sounds",
    emoji: "🌧️",
    src: "/audio/siarhei_korbut-after-the-rain-ended-617774.mp3",
  },
  {
    title: "Ocean Waves",
    category: "Nature sounds",
    emoji: "🌊",
    src: "/audio/konstantinpazuzustudio-ocean-piano-waves-part-4-510370.mp3",
  },
  {
    title: "Peaceful Forest",
    category: "Nature sounds",
    emoji: "🌿",
    src: "/audio/leberch-peaceful-585609.mp3",
  },
  {
    title: "Soft Piano",
    category: "Instrumental",
    emoji: "🎹",
    src: "/audio/leberch-soft-piano-soft-piano-music-603947.mp3",
  },
  {
    title: "Calm Instrumental",
    category: "Instrumental",
    emoji: "🎶",
    src: "/audio/vibeschill-lo-fi-deep-sad-245363.mp3",
  },
];

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "🥰", label: "Grateful" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😰", label: "Stressed" },
];

const selfCareTasks = [
  { id: 1, emoji: "💧", title: "Drink enough water" },
  { id: 2, emoji: "🧘", title: "Take a mindful break" },
  { id: 3, emoji: "🚶", title: "Walk or stretch for 10 minutes" },
  { id: 4, emoji: "📖", title: "Read something inspiring" },
  { id: 5, emoji: "🥗", title: "Eat a nourishing meal" },
  { id: 6, emoji: "🌙", title: "Make time for restful sleep" },
];

type GratitudeEntry = {
  id: number;
  text: string;
  date: string;
};

type MoodEntry = {
  mood: string;
  date: string;
};

export default function MindfulPage() {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(65);
  const [breathing, setBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState("Ready?");
  const [secondsLeft, setSecondsLeft] = useState(60);

  const [gratitudeText, setGratitudeText] = useState("");
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load saved data from localStorage.
  useEffect(() => {
    try {
      const savedGratitude = localStorage.getItem("bloom-gratitude");
      const savedMoods = localStorage.getItem("bloom-moods");
      const savedTasks = localStorage.getItem("bloom-selfcare-tasks");
      const today = new Date().toDateString();

      if (savedGratitude) {
        const entries: GratitudeEntry[] = JSON.parse(savedGratitude);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setGratitudeEntries(entries);
      }

      if (savedMoods) {
        const entries: MoodEntry[] = JSON.parse(savedMoods);
        setMoodEntries(entries);
        const todaysMood = entries.find((entry) => entry.date === today);
        if (todaysMood) setSelectedMood(todaysMood.mood);
      }

      if (savedTasks) {
        const data = JSON.parse(savedTasks);
        if (data.date === today) setCompletedTasks(data.tasks);
      }
    } catch {
      console.error("Could not load saved Mindful Corner data.");
    }
  }, []);

  // Keep volume in sync with the audio player.
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Stop audio when leaving the page.
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current?.pause();
    };
  }, []);

  // Guided breathing: inhale 4s, hold 4s, exhale 6s.
  useEffect(() => {
    if (!breathing) return;

    const phases = [
      { label: "Breathe in...", duration: 4 },
      { label: "Hold gently...", duration: 4 },
      { label: "Breathe out...", duration: 6 },
    ];

    let elapsed = 0;

    const updatePhase = () => {
      const position = elapsed % 14;

      if (position < 4) {
        setBreathPhase("Breathe in...");
      } else if (position < 8) {
        setBreathPhase("Hold gently...");
      } else {
        setBreathPhase("Breathe out...");
      }
    };

    updatePhase();

    const timer = window.setInterval(() => {
      elapsed += 1;

      setSecondsLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          setBreathing(false);
          setBreathPhase("Lovely work! 🌷");
          return 0;
        }
        return previous - 1;
      });

      updatePhase();
    }, 1000);

    return () => window.clearInterval(timer);
  }, [breathing]);

  const playTrack = async (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (activeTrack === index && isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (activeTrack === index) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    audio.src = musicTracks[index].src;
    audio.volume = volume / 100;
    audio.load();

    setActiveTrack(index);
    setIsPlaying(false);

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      alert(
        `Could not play ${musicTracks[index].title}. Check whether the audio file exists in public/audio.`,
      );
    }
  };

  const saveGratitude = () => {
    const text = gratitudeText.trim();
    if (!text) return;

    const entry: GratitudeEntry = {
      id: Date.now(),
      text,
      date: new Date().toLocaleDateString(),
    };

    const updated = [entry, ...gratitudeEntries];
    setGratitudeEntries(updated);
    localStorage.setItem("bloom-gratitude", JSON.stringify(updated));
    setGratitudeText("");
  };

  const deleteGratitude = (id: number) => {
    const updated = gratitudeEntries.filter((entry) => entry.id !== id);
    setGratitudeEntries(updated);
    localStorage.setItem("bloom-gratitude", JSON.stringify(updated));
  };

  const saveMood = (mood: string) => {
    const today = new Date().toDateString();
    const updated = [
      { mood, date: today },
      ...moodEntries.filter((entry) => entry.date !== today),
    ];

    setSelectedMood(mood);
    setMoodEntries(updated);
    localStorage.setItem("bloom-moods", JSON.stringify(updated));
  };

  const toggleTask = (id: number) => {
    const updated = completedTasks.includes(id)
      ? completedTasks.filter((taskId) => taskId !== id)
      : [...completedTasks, id];

    setCompletedTasks(updated);
    localStorage.setItem(
      "bloom-selfcare-tasks",
      JSON.stringify({
        date: new Date().toDateString(),
        tasks: updated,
      }),
    );
  };

  const stopBreathing = () => {
    setBreathing(false);
    setBreathPhase("Ready?");
    setSecondsLeft(60);
  };

  const progress = Math.round(
    (completedTasks.length / selfCareTasks.length) * 100,
  );

  return (
    <main className="min-h-screen bg-[#faf7ff] p-4 text-[#49365f] transition-colors dark:bg-[#171521] dark:text-[#f5edf7] md:p-6 lg:p-8">
      <div className="mx-auto grid max-w-360 grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-6 h-[calc(100vh-48px)]">
            <Sidebar />
          </div>
        </aside>

        <section className="min-w-0 space-y-7">
          {/* Page heading */}
          <header className="rounded-3xl bg-linear-to-br from-[#eee5ff] via-[#f8eafa] to-[#e3f5e9] p-6 sm:p-8">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-[#8062cf]">
              <Sparkles size={17} />
              YOUR PERSONAL RESET SPACE
            </p>
            <h1 className="text-3xl font-extrabold sm:text-4xl">
              Mindful Corner 🌷
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#81708f] sm:text-base">
              Take a little pause. Listen, breathe, and care for yourself.
              Small moments can make a beautiful difference.
            </p>
          </header>

          {/* Music Room */}
          <section className="rounded-3xl border border-[#eee7f6] bg-white p-5 dark:border-[#40374b] dark:bg-[#242130] sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-[#eee5ff] p-3 text-[#8062cf]">
                <Music2 size={23} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold">Soft Music Room</h2>
                <p className="text-sm text-[#a092b4]">
                  Choose a sound that feels right for you.
                </p>
              </div>
            </div>

            <audio
              ref={audioRef}
              onEnded={() => setIsPlaying(false)}
              onError={() => setIsPlaying(false)}
              loop
            />

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {musicTracks.map((track, index) => (
                <div
                  key={track.title}
                  className={`rounded-2xl border p-4 transition ${
                    activeTrack === index && isPlaying
                      ? "border-[#bba4f5] bg-[#f4efff] dark:bg-[#302640]"
                      : "border-[#f1ecf7] bg-[#fffdfd] dark:border-[#40374b] dark:bg-[#201c2b]"
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-3xl">{track.emoji}</span>
                    <button
                      onClick={() => playTrack(index)}
                      aria-label={
                        activeTrack === index && isPlaying
                          ? `Pause ${track.title}`
                          : `Play ${track.title}`
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a78bfa] text-white transition hover:bg-[#8062cf]"
                    >
                      {activeTrack === index && isPlaying ? (
                        <Pause size={18} />
                      ) : (
                        <Play size={18} />
                      )}
                    </button>
                  </div>
                  <h3 className="font-bold">{track.title}</h3>
                  <p className="mt-1 text-xs text-[#a092b4]">
                    {track.category}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#faf7ff] p-4 dark:bg-[#302a3d]">
              <Volume2 size={20} className="shrink-0 text-[#8062cf]" />
              <input
                aria-label="Music volume"
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                className="w-full accent-[#a78bfa]"
              />
              <span className="w-10 text-right text-sm text-[#897e99]">
                {volume}%
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-[#a092b4]">
              Music files must exist inside the public/audio folder.
            </p>
          </section>

          {/* Breathing Exercise */}
          <section className="rounded-3xl border border-[#eee7f6] bg-white p-5 dark:border-[#40374b] dark:bg-[#242130] sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-[#f8dce8] p-3 text-[#c16d91]">
                <Wind size={23} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold">A Moment to Breathe</h2>
                <p className="text-sm text-[#a092b4]">
                  Follow the prompts and take it at your own pace.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center rounded-3xl bg-[#fff7fb] px-4 py-7 dark:bg-[#302438]">
              <div
                className={`flex h-36 w-36 items-center justify-center rounded-full bg-linear-to-br from-[#e8d9ff] to-[#f8dce8] text-center shadow-lg shadow-[#e8d9ff]/50 transition-transform duration-1000 ${
                  breathing ? "scale-110" : "scale-100"
                }`}
              >
                <div>
                  <Wind size={27} className="mx-auto mb-2 text-[#8062cf]" />
                  <p className="text-sm font-extrabold text-[#49365f]">
                    {breathPhase}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm text-[#897e99]">
                {secondsLeft === 0
                  ? "Your breathing session is complete 🌷"
                  : breathing
                    ? `${secondsLeft} seconds remaining`
                    : "Take 1 minute just for yourself."}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    if (breathing) {
                      stopBreathing();
                    } else {
                      setSecondsLeft(60);
                      setBreathPhase("Breathe in...");
                      setBreathing(true);
                    }
                  }}
                  className="rounded-xl bg-[#a78bfa] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8062cf]"
                >
                  {breathing ? "Stop session" : "Start breathing"}
                </button>
                {secondsLeft === 0 && (
                  <button
                    onClick={stopBreathing}
                    className="flex items-center gap-2 rounded-xl border border-[#eee7f6] px-4 py-3 text-sm font-bold"
                  >
                    <RotateCcw size={15} />
                    Reset
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Gratitude Journal */}
          <section className="rounded-3xl border border-[#eee7f6] bg-white p-5 dark:border-[#40374b] dark:bg-[#242130] sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-[#fce7f3] p-3 text-[#c16d91]">
                <BookHeart size={23} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold">Gratitude Journal</h2>
                <p className="text-sm text-[#a092b4]">
                  Write down the little things that made you smile.
                </p>
              </div>
            </div>

            <textarea
              value={gratitudeText}
              onChange={(event) => setGratitudeText(event.target.value)}
              placeholder="Today, I am grateful for..."
              rows={3}
              maxLength={500}
              className="w-full resize-y rounded-2xl border border-[#eee7f6] bg-[#fffdfd] p-4 text-sm outline-none transition placeholder:text-[#b5a8c2] focus:border-[#bba4f5] dark:border-[#40374b] dark:bg-[#201c2b]"
            />

            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs text-[#a092b4]">
                {gratitudeText.length}/500 characters
              </span>
              <button
                onClick={saveGratitude}
                disabled={!gratitudeText.trim()}
                className="rounded-xl bg-[#a78bfa] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8062cf] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save entry
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {gratitudeEntries.length === 0 ? (
                <p className="rounded-2xl bg-[#faf7ff] p-4 text-center text-sm text-[#a092b4] dark:bg-[#302a3d]">
                  Your journal is waiting for your first happy thought 🌸
                </p>
              ) : (
                gratitudeEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start justify-between gap-3 rounded-2xl bg-[#faf7ff] p-4 dark:bg-[#302a3d]"
                  >
                    <div className="min-w-0">
                      <p className="whitespace-pre-wrap wrap-break-word text-sm">
                        {entry.text}
                      </p>
                      <p className="mt-2 text-xs text-[#a092b4]">
                        {entry.date}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteGratitude(entry.id)}
                      aria-label="Delete gratitude entry"
                      className="rounded-lg p-2 text-[#c16d91] transition hover:bg-[#fce7f3]"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Mood Tracker */}
          <section className="rounded-3xl border border-[#eee7f6] bg-white p-5 dark:border-[#40374b] dark:bg-[#242130] sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-[#e3f5e9] p-3 text-[#438761]">
                <Smile size={23} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold">How Are You Feeling?</h2>
                <p className="text-sm text-[#a092b4]">
                  Check in with yourself. There is no wrong answer.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => saveMood(mood.label)}
                  className={`rounded-2xl border p-4 text-center transition hover:-translate-y-0.5 ${
                    selectedMood === mood.label
                      ? "border-[#a78bfa] bg-[#f4efff] ring-2 ring-[#e8d9ff] dark:bg-[#302640]"
                      : "border-[#eee7f6] bg-[#fffdfd] dark:border-[#40374b] dark:bg-[#201c2b]"
                  }`}
                >
                  <span className="block text-3xl">{mood.emoji}</span>
                  <span className="mt-2 block text-sm font-bold">
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>

            {selectedMood && (
              <p className="mt-4 flex items-center gap-2 rounded-2xl bg-[#eef7e9] p-4 text-sm font-semibold text-[#438761] dark:bg-[#23392d] dark:text-[#c7e5ca]">
                <Heart size={17} />
                Today's mood saved: {selectedMood}
              </p>
            )}

            <div className="mt-5 rounded-2xl bg-[#faf7ff] p-4 dark:bg-[#302a3d]">
              <p className="mb-3 text-sm font-bold">Recent mood check-ins</p>
              {moodEntries.length === 0 ? (
                <p className="text-sm text-[#a092b4]">
                  Your mood history will appear here.
                </p>
              ) : (
                <div className="space-y-2">
                  {moodEntries.slice(0, 5).map((entry) => (
                    <div
                      key={entry.date}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span>{entry.date}</span>
                      <span className="font-semibold">{entry.mood}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Self-care Checklist */}
          <section className="rounded-3xl border border-[#eee7f6] bg-white p-5 dark:border-[#40374b] dark:bg-[#242130] sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-[#fff0d9] p-3 text-[#bd8741]">
                <CheckCircle2 size={23} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold">Self-care Checklist</h2>
                <p className="text-sm text-[#a092b4]">
                  Little acts of care count, too.
                </p>
              </div>
            </div>

            <div className="mb-5 rounded-2xl bg-[#faf7ff] p-4 dark:bg-[#302a3d]">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold">Today's progress</span>
                <span className="text-sm font-extrabold text-[#8062cf]">
                  {completedTasks.length}/{selfCareTasks.length}
                </span>
              </div>
              <div
                className="h-3 overflow-hidden rounded-full bg-[#e8dff3] dark:bg-[#453951]"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-linear-to-r from-[#a78bfa] to-[#e8a8c5] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-[#a092b4]">
                {progress === 100
                  ? "Amazing! You made time for yourself today. 💗"
                  : "Every small step is worth celebrating."}
              </p>
            </div>

            <div className="space-y-3">
              {selfCareTasks.map((task) => {
                const checked = completedTasks.includes(task.id);

                return (
                  <label
                    key={task.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                      checked
                        ? "border-[#c9e8d1] bg-[#eef7e9] dark:border-[#49684f] dark:bg-[#23392d]"
                        : "border-[#eee7f6] bg-[#fffdfd] dark:border-[#40374b] dark:bg-[#201c2b]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleTask(task.id)}
                      className="h-5 w-5 accent-[#8062cf]"
                    />
                    <span className="text-2xl">{task.emoji}</span>
                    <span
                      className={`flex-1 text-sm font-semibold ${
                        checked ? "line-through opacity-60" : ""
                      }`}
                    >
                      {task.title}
                    </span>
                  </label>
                );
              })}
            </div>

            <button
              onClick={() => {
                setCompletedTasks([]);
                localStorage.setItem(
                  "bloom-selfcare-tasks",
                  JSON.stringify({
                    date: new Date().toDateString(),
                    tasks: [],
                  }),
                );
              }}
              className="mt-4 flex items-center gap-2 rounded-xl border border-[#eee7f6] px-4 py-2 text-sm font-bold text-[#897e99] transition hover:bg-[#faf7ff] dark:border-[#40374b] dark:hover:bg-[#302a3d]"
            >
              <RotateCcw size={15} />
              Reset checklist
            </button>
          </section>

          <footer className="pb-3 text-center text-xs text-[#b1a5c1]">
            Take your time. You are allowed to rest. ♡
          </footer>
        </section>
      </div>
    </main>
  );
}
