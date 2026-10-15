
"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import {
  Music2,
  Play,
  Pause,
  Volume2,
  Flower2,
  TreeDeciduous,
  Circle,
  Waves,
  Wind,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type GardenItem = {
  id: number;
  emoji: string;
};


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


const gardenOptions = [
  { emoji: "🌸", label: "Flower" },
  { emoji: "🌳", label: "Tree" },
  { emoji: "🪨", label: "Stone" },
  { emoji: "🌷", label: "Tulip" },
  { emoji: "🍄", label: "Mushroom" },
  { emoji: "🪷", label: "Lotus" },
];

export default function MindfulPage() {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(65);
  const [garden, setGarden] = useState<GardenItem[]>([]);
  const [breathing, setBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState("Ready?");
  const [secondsLeft, setSecondsLeft] = useState(60);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Update audio volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, activeTrack]);

  // Guided breathing timer
  useEffect(() => {
    if (!breathing) return;

    const phases = [
      { label: "Breathe in...", duration: 4 },
      { label: "Hold gently...", duration: 4 },
      { label: "Breathe out...", duration: 6 },
    ];

    let phaseIndex = 0;
    let phaseSeconds = phases[0].duration;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBreathPhase(phases[0].label);

    const interval = window.setInterval(() => {
      setSecondsLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(interval);
          setBreathing(false);
          setBreathPhase("Lovely work! 🌷");
          return 60;
        }

        return previous - 1;
      });

      phaseSeconds -= 1;

      if (phaseSeconds <= 0) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        phaseSeconds = phases[phaseIndex].duration;
        setBreathPhase(phases[phaseIndex].label);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [breathing]);

  const playTrack = async (index: number) => {
    if (activeTrack === index && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    if (activeTrack === index && audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    setActiveTrack(index);
    setIsPlaying(false);

    // Playback starts after the selected audio source is loaded.
    window.setTimeout(async () => {
      if (!audioRef.current) return;

      audioRef.current.src = musicTracks[index].src;
      audioRef.current.volume = volume / 100;
      audioRef.current.load();

      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }, 50);
  };

  const addGardenItem = (emoji: string) => {
    setGarden((previous) => [
      ...previous,
      { id: Date.now() + Math.random(), emoji },
    ]);
  };

  const clearGarden = () => setGarden([]);

  const stopBreathing = () => {
    setBreathing(false);
    setBreathPhase("Ready?");
    setSecondsLeft(60);
  };

  return (
    <main className="min-h-screen bg-[#faf7ff] p-4 text-[#49365f] transition-colors dark:bg-[#171521] dark:text-[#f5edf7] md:p-6 lg:p-8">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        {/* Existing sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 h-[calc(100vh-48px)]">
            <Sidebar />
          </div>
        </aside>

        <section className="min-w-0 space-y-7">
          {/* Page heading */}
          <header className="rounded-3xl bg-gradient-to-br from-[#eee5ff] via-[#f8eafa] to-[#e3f5e9] p-6 sm:p-8">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-[#8062cf]">
              <Sparkles size={17} />
              YOUR PERSONAL RESET SPACE
            </p>

            <h1 className="text-3xl font-extrabold sm:text-4xl">
              Mindful Corner 🌷
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#81708f] sm:text-base">
              Take a little pause. Listen, breathe, and create a peaceful
              moment just for yourself.
            </p>
          </header>

          {/* Music room */}
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
              Music not playing? Add your audio files to the public/audio
              folder using the filenames shown in the setup instructions below.
            </p>
          </section>

          {/* Zen Garden */}
          <section className="rounded-3xl border border-[#eee7f6] bg-white p-5 dark:border-[#40374b] dark:bg-[#242130] sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-[#dff3e5] p-3 text-[#438761]">
                  <Flower2 size={23} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold">My Zen Garden</h2>
                  <p className="text-sm text-[#a092b4]">
                    Create your own tiny peaceful world.
                  </p>
                </div>
              </div>

              <button
                onClick={clearGarden}
                className="flex items-center gap-2 rounded-xl border border-[#eee7f6] px-3 py-2 text-sm font-bold text-[#897e99] transition hover:bg-[#faf7ff] dark:border-[#40374b] dark:hover:bg-[#302a3d]"
              >
                <RotateCcw size={15} />
                Reset
              </button>
            </div>

            {/* Garden canvas */}
            <div
              className="relative flex min-h-[260px] flex-wrap content-start items-start gap-2 overflow-hidden rounded-3xl border-2 border-dashed border-[#c8dfc9] bg-gradient-to-br from-[#eef7e9] via-[#e4f2e4] to-[#d7ead9] p-5 dark:border-[#49684f] dark:from-[#23392d] dark:via-[#263e30] dark:to-[#304834] sm:min-h-[320px] sm:gap-4 sm:p-7"
              aria-label="Your Zen Garden"
            >
              <div className="pointer-events-none absolute bottom-4 right-4 text-5xl opacity-40">
                🌱
              </div>

              {garden.length === 0 ? (
                <div className="flex min-h-[220px] w-full flex-col items-center justify-center text-center sm:min-h-[270px]">
                  <span className="mb-3 text-5xl">🪴</span>
                  <p className="font-bold text-[#53795d] dark:text-[#c7e5ca]">
                    Your garden is waiting to bloom
                  </p>
                  <p className="mt-2 text-sm text-[#719078] dark:text-[#b2ceb6]">
                    Choose something below to begin.
                  </p>
                </div>
              ) : (
                garden.map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      setGarden((previous) =>
                        previous.filter((gardenItem) => gardenItem.id !== item.id)
                      )
                    }
                    title="Click to remove"
                    aria-label={`Remove ${item.emoji} from garden`}
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/60 text-3xl shadow-sm transition hover:scale-110 sm:h-16 sm:w-16 sm:text-4xl"
                  >
                    {item.emoji}
                  </button>
                ))
              )}
            </div>

            <div className="mt-5">
              <p className="mb-3 text-sm font-bold">Add to your garden</p>
              <div className="flex flex-wrap gap-2">
                {gardenOptions.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => addGardenItem(item.emoji)}
                    className="flex items-center gap-2 rounded-xl border border-[#eee7f6] bg-[#fffdfd] px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-[#f4efff] dark:border-[#40374b] dark:bg-[#201c2b] dark:hover:bg-[#302640]"
                  >
                    <span className="text-xl">{item.emoji}</span>
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#a092b4]">
                Tip: Click any item inside your garden to remove it.
              </p>
            </div>
          </section>

          {/* Breathing exercise */}
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
                className={`flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-[#e8d9ff] to-[#f8dce8] text-center shadow-lg shadow-[#e8d9ff]/50 transition-transform duration-[4000ms] ${
                  breathing ? "scale-110" : "scale-100"
                }`}
              >
                <div>
                  <Wind size={27} className="mx-auto mb-2 text-[#8062cf]" />
                  <p className="text-sm font-extrabold text-[#49365f]">
                    {breathing ? breathPhase : "Breathe"}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm text-[#897e99]">
                {breathing
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
                      setBreathing(true);
                    }
                  }}
                  className="rounded-xl bg-[#a78bfa] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8062cf]"
                >
                  {breathing ? "Stop session" : "Start breathing"}
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pb-3 text-center text-xs text-[#b1a5c1]">
            Take your time. You are allowed to rest. ♡
          </footer>
        </section>
      </div>
    </main>
  );
}
