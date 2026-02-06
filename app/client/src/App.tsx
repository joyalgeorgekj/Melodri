import {
    useEffect,
    useRef,
    useState,
    type MouseEvent,
    type ReactNode,
    type RefObject,
} from "react";
import { Github, MessageSquare, AlertCircle, Play, Search } from "lucide-react";
import Header from "./components/Header";

export default function MelodriApp() {
    const [file, setFile] = useState<File | null>(null);
    const [timestamp, setTimestamp] = useState<string | number>("00:00:00.000");
    const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement | null>(null);

    const formatForFFmpeg = (seconds: number): string => {
        const date = new Date(0);
        date.setSeconds(seconds);

        const hh = date.getUTCHours().toString().padStart(2, "0");
        const mm = date.getUTCMinutes().toString().padStart(2, "0");
        const ss = date.getUTCSeconds().toString().padStart(2, "0");

        // Extract milliseconds from the decimal remainder
        const ms = Math.floor((seconds % 1) * 1000)
            .toString()
            .padStart(3, "0");

        return `${hh}:${mm}:${ss}.${ms}`;
    };

    // Example: 125.45s -> "00:02:05.450"

    function captureTimestamp(
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    ) {
        e.preventDefault();
        if (mediaRef.current) {
            const currentTime = mediaRef.current.currentTime;
            setTimestamp(formatForFFmpeg(currentTime));
            console.log("Start point set at:", currentTime, "seconds");
            mediaRef.current.currentTime = currentTime;
        }
    }

    function SocialLink({
        icon,
        label,
        href,
    }: {
        icon: ReactNode;
        label: string;
        href?: string;
    }) {
        return (
            <a
                href={href ?? ""}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-900 rounded-sm text-neutral-400 hover:text-neutral-200 hover:border-neutral-700 transition-all text-sm font-medium"
            >
                {icon}
                {label}
            </a>
        );
    }

    useEffect(() => console.log(file), [file]);

    return (
        <div className="min-h-screen text-neutral-200 font-sans selection:bg-neutral-200 selection:text-black">
            <Header />
            {/* 2-COLUMN MAIN CONTENT */}
            <main className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto w-full gap-12 px-8 py-20 min-h-[90vh] items-center">
                {/* COLUMN 1: THE STORY */}
                <section className="space-y-10">
                    <div className="space-y-6">
                        <h1 className="text-8xl font-black tracking-tighter leading-[0.85] text-neutral-200">
                            MELODRI<span className="text-neutral-500">.</span>
                        </h1>
                        <p className="text-neutral-400 text-xl max-w-md leading-relaxed font-medium">
                            Multimodal music identification. Powered by Gemini 3
                            to find songs inside your videos instantly.
                        </p>
                    </div>

                    {/* SOCIAL LINKS - Outline Style */}
                    <div className="flex flex-wrap gap-3">
                        <SocialLink icon={<Github size={18} />} label="Repo" />
                        <SocialLink
                            icon={<MessageSquare size={18} />}
                            label="Feedback"
                        />
                        <SocialLink
                            icon={<AlertCircle size={18} />}
                            label="Bugs"
                        />
                    </div>
                </section>

                {/* COLUMN 2: THE INTERACTIVE TOOL */}
                <section className="relative group">
                    {/* Subtle Glow behind card */}
                    <div className="absolute -inset-1 bg-neutral-200/5 rounded-sm blur-2xl group-hover:bg-neutral-200/10 transition duration-1000"></div>

                    <div className="relative bg-black/40 backdrop-blur-3xl border border-neutral-800 rounded-sm p-8 shadow-2xl">
                        {!file ? (
                            <div className="input border border-dashed border-neutral-700 rounded-sm p-16 flex flex-col items-center justify-center text-center hover:border-neutral-200 transition-all cursor-pointer">
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) =>
                                        setFile(
                                            e.target.files !== null
                                                ? e.target.files[0]
                                                : null,
                                        )
                                    }
                                />
                                <Play
                                    size={32}
                                    className="mb-4 text-neutral-500"
                                />
                                <p className="text-lg font-bold uppercase tracking-widest">
                                    Upload Content
                                </p>
                                <p className="text-neutral-500 text-xs mt-2 font-mono">
                                    MP4, MOV, MP3 (MAX 50MB)
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6 transition-all delay-100">
                                {/* VIDEO PREVIEW BOX */}
                                <div className="aspect-video bg-black/60 border border-neutral-800 flex items-center justify-center">
                                    {file !== null &&
                                    file.type.split("/")[0] === "audio" ? (
                                        <audio ref={mediaRef} controls>
                                            <source
                                                src={URL.createObjectURL(file)}
                                                type={file.type}
                                            />
                                            Your browser does not support the
                                            audio element.
                                        </audio>
                                    ) : (
                                        <video
                                            ref={
                                                mediaRef as RefObject<HTMLVideoElement>
                                            }
                                            src={URL.createObjectURL(file)}
                                            controls
                                        >
                                            <source
                                                src={URL.createObjectURL(file)}
                                                type={file.type}
                                            />
                                            Your browser does not support the
                                            video tag.
                                        </video>
                                    )}
                                </div>

                                {/* TIMESTAMP SELECTOR */}
                                <div className="flex items-center justify-between p-4 border border-neutral-800 bg-black/20">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                                        Analysis Start
                                    </span>
                                    <span className="text-xl font-mono text-neutral-200 tracking-tighter">
                                        {timestamp}
                                    </span>
                                </div>

                                <button
                                    className="w-full bg-neutral-200 text-black py-5 font-black transition-colors uppercase tracking-widest hover:bg-neutral-200/75 hover:scale-95 ease-in-out cursor-pointer flex items-center justify-center gap-3"
                                    onClick={(e) => captureTimestamp(e)}
                                    type="button"
                                >
                                    <Search size={20} />
                                    Find Song
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* FOOTER - Minimalist */}
            <footer className="px-8 py-10 border-t border-neutral-900 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="text-xs space-y-2">
                        <p className="font-bold uppercase tracking-tighter text-neutral-200">
                            © 2026 MELODRI
                        </p>
                        <p>Built for the Google AI Hackathon.</p>
                    </div>
                    <div className="text-[10px] font-mono flex gap-6 uppercase tracking-widest">
                        <a href="#" className="hover:text-white">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-white">
                            Terms
                        </a>
                        <a href="#" className="hover:text-white">
                            Stack: React + Gemini 3
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
