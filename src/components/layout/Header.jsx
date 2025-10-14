import { Button } from '@/components/ui/button'
import { Search, Menu, Bell } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function Header({ onMenuToggle }) {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <div className="lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMenuToggle}
            className="text-[var(--color-foreground)] hover:bg-[var(--color-background)]"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Empty div to maintain flex spacing */}
        <div className="flex-1"></div>

        {/* Search bar - Center on mobile, right on desktop */}
        <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
          <div className="max-w-lg w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[var(--color-foreground-muted)]" />
              </div>
              <Input
                className="block w-full pl-10 pr-3 py-2 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-foreground)] placeholder-[var(--color-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)] focus:border-transparent text-sm rounded-lg transition-all duration-200"
                placeholder="Rechercher..."
                type="search"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-2 sm:ml-4">
          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-[var(--color-foreground-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-foreground)]"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
