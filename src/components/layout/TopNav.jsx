import { Menu } from "lucide-react";

export function TopNav({ onMenuClick }) {
  return (
    <nav className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--color-surface)] border-b border-[var(--color-border)] z-40 flex items-center justify-between px-4">
      {/* Burger Menu Button - Left */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-md text-[var(--color-foreground-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-foreground)] transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Empty space - Center */}
      <div className="flex-1"></div>

      {/* Logo - Right */}
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-[var(--color-foreground)]">
          GestCom
        </h1>
      </div>
    </nav>
  );
}
