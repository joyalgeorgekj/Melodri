import type { ReactNode } from "react";

export function SocialLink({
  icon,
  label,
  href = "#",
}: {
  icon: ReactNode;
  label: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 px-4 py-2 border border-neutral-900 rounded-sm
                 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700
                 transition-all text-sm font-medium"
    >
      {icon}
      {label}
    </a>
  );
}