import { useState } from "react";
import ModeToggle from "./ModeToggle";

function Header() {
    const [isDemo, setIsDemo] = useState(false);

    const onToggle = () => {
        setIsDemo((prev) => !prev);
    };

    return (
        <header className="w-4/5 bg-neutral-300 rounded-[20px] p-4 backdrop-blur-lg border border-neutral-200/20 mt-6 mx-auto h-fit flex justify-between">
            <div className="flex items-center text-[#EB3E6B] capitalize font-bold gap-2 cursor-pointer text-xl font-sans">
                <img
                    src="/assets/image/logo.svg"
                    alt="logo"
                    className="aspect-square w-12.5"
                />
                <h1>Melodri.</h1>
            </div>
            <ModeToggle isDemo={isDemo} onToggle={onToggle} />
        </header>
    );
}

export default Header;
