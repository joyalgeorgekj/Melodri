const ModeToggle = ({
    isDemo,
    onToggle,
}: {
    isDemo: boolean;
    onToggle: () => void;
}) => {
    return (
        <div className="flex flex-row justify-center items-center gap-4">
            {/* Visual Label */}
            <span
                className={`text-sm uppercase font-semibold transition-colors duration-300 text-neutral-700`}
            >
                Demo Mode
            </span>

            {/* Toggle Container */}
            <label className="relative inline-flex items-center cursor-pointer group" htmlFor="demo-toggle">
                {/* Hidden Checkbox - Handlers the state & keyboard access */}
                <input
                    id="demo-toggle"
                    type="checkbox"
                    className="sr-only peer"
                    checked={!isDemo}
                    onChange={onToggle}
                    disabled
                />

                {/* The Track (Background) */}
                <div
                    className="w-18 h-10 bg-slate-200 rounded-full border border-slate-200 
          peer-focus:ring-2 peer-focus:ring-slate-200 transition-all duration-300 peer-checked:bg-green-500"
                ></div>

                {/* The Thumb (Sliding Circle) */}
                <div
                    className="absolute left-1 top-1 w-8 aspect-square rounded-full transition-all duration-300 transform bg-neutral-700  peer-checked:translate-x-8 shadow-[0_0_10px_rgba(139,92,246,0.4)] flex items-center justify-center"
                >
                    {/* Subtle Icon indicators (Using Emoji for zero dependencies) */}
                    <span className="text-xs font-bold select-none">
                        {!isDemo ? "ON" : "OFF"}
                    </span>
                </div>
            </label>
        </div>
    );
};

export default ModeToggle;
