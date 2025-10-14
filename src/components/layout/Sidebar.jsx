import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  BarChart3,
  Truck,
  Calculator,
  ChevronRight,
  ChevronDown,
  LogOut,
  User
} from 'lucide-react'

const menuItems = [
  {
    title: 'Tableau de Bord',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Gestion du Stock',
    href: '/stock',
    icon: Package,
  },
  {
    title: 'Achats',
    href: '/achats',
    icon: ShoppingCart,
    items: [
      { title: 'Achats', href: '/achats' },
      { title: 'Factures', href: '/achats/factures' },
      { title: 'Fournisseurs', href: '/fournisseurs' }
    ]
  },
  {
    title: 'Ventes',
    href: '/sales',
    icon: ShoppingCart,
    items: [
      { title: 'Commandes', href: '/sales/orders' },
      { title: 'Factures', href: '/sales/invoices' },
      { title: 'Clients', href: '/clients' }
    ]
  },
  {
    title: 'Fournisseurs',
    href: '/suppliers',
    icon: Truck,
  },
  {
    title: 'Rapports',
    icon: BarChart3,
    items: [
      { title: 'Ventes', href: '/reports/sales' },
      { title: 'Stocks', href: '/reports/stock' },
      { title: 'Financier', href: '/reports/financial' }
    ]
  },
  {
    title: 'Paramètres',
    href: '/settings',
    icon: Settings,
  },
]

const MenuItem = ({ item, isActive, onToggle, isOpen }) => {
  const Icon = item.icon
  const hasItems = item.items && item.items.length > 0
  
  return (
    <div className="mb-1">
      <Link
        to={item.href || '#'}
        onClick={(e) => {
          if (hasItems) {
            e.preventDefault()
            onToggle()
          }
        }}
        className={`group flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors ${
          isActive
            ? 'bg-[var(--color-blue)] text-white'
            : 'text-[var(--color-foreground-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-foreground)]'
        }`}
      >
        <div className="flex items-center">
          <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
          <span className="font-medium">{item.title}</span>
        </div>
        {hasItems && (
          <span className="ml-2">
            {isOpen ? (
              <ChevronDown className="h-4 w-4 transition-transform" />
            ) : (
              <ChevronRight className="h-4 w-4 transition-transform" />
            )}
          </span>
        )}
      </Link>
      
      {hasItems && isOpen && (
        <div className="mt-1 ml-8 space-y-1 overflow-visible">
          {item.items.map((subItem) => {
            const isSubActive = location.pathname === subItem.href
            return (
              <Link
                key={subItem.href}
                to={subItem.href}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isSubActive
                    ? 'text-[var(--color-blue)] font-medium bg-[var(--color-blue)]/5'
                    : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background)]'
                }`}
              >
                {subItem.title}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Custom hook to handle clicks outside an element
function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}

export function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const [openItems, setOpenItems] = useState({})
  const dropdownRef = useRef(null)

  const toggleItem = (title) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  // Auto-expand parent when child is active
  useEffect(() => {
    const newOpenItems = { ...openItems }
    let shouldUpdate = false
    
    menuItems.forEach(item => {
      if (item.items) {
        const hasActiveChild = item.items.some(subItem => 
          location.pathname === subItem.href
        )
        if (hasActiveChild && !openItems[item.title]) {
          newOpenItems[item.title] = true
          shouldUpdate = true
        }
      }
    })
    
    if (shouldUpdate) {
      setOpenItems(newOpenItems)
    }
  }, [location.pathname])

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => {
    if (openItems['userProfile']) {
      setOpenItems(prev => ({ ...prev, userProfile: false }))
    }
  })

  return (
    <div 
      className="flex flex-col h-screen bg-[var(--color-surface)] border-r border-[var(--color-border)] w-64 fixed left-0 top-0 z-50 overflow-y-auto"
      ref={dropdownRef}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-[var(--color-border)]">
        <h1 className="text-xl font-semibold text-[var(--color-foreground)]">GestCom</h1>
        <button 
          onClick={onClose}
          className="lg:hidden p-1 rounded-md text-[var(--color-foreground-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-foreground)]"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 px-3">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            // Special case for the dashboard to be active on both / and /dashboard
            const isDashboard = item.href === '/';
            const isActive = isDashboard 
              ? location.pathname === '/' || location.pathname === '/dashboard'
              : location.pathname === item.href || 
                (item.items && item.items.some(subItem => location.pathname === subItem.href));
            
            return (
              <MenuItem
                key={item.href || item.title}
                item={item}
                isActive={isActive}
                isOpen={openItems[item.title] || false}
                onToggle={() => toggleItem(item.title)}
              />
            )
          })}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="border-t border-[var(--color-border)] p-4">
        <div className="group relative">
          <button 
            className="flex items-center w-full p-2 rounded-lg hover:bg-[var(--color-background)] transition-colors"
            onClick={() => toggleItem('userProfile')}
          >
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[var(--color-blue)]/10 flex items-center justify-center text-[var(--color-blue)]">
              <User className="h-5 w-5" />
            </div>
            <div className="ml-3 text-left overflow-hidden">
              <p className="text-sm font-medium text-[var(--color-foreground)] truncate">Admin User</p>
              <p className="text-xs text-[var(--color-foreground-muted)] truncate">Administrateur</p>
            </div>
            <ChevronDown className={`ml-auto h-4 w-4 text-[var(--color-foreground-muted)] transition-transform ${openItems['userProfile'] ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown Menu */}
          {openItems['userProfile'] && (
            <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-[var(--color-border)] overflow-hidden z-10">
              <div className="p-4 border-b border-[var(--color-border)]">
                <p className="text-sm font-medium text-[var(--color-foreground)]">admin@example.com</p>
                <p className="text-xs text-[var(--color-foreground-muted)]">Dernière connexion: Aujourd'hui</p>
              </div>
              <div className="py-1">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-[var(--color-foreground-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-foreground)]"
                >
                  Mon Profil
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-[var(--color-foreground-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-foreground)]"
                >
                  Paramètres
                </Link>
                <div className="border-t border-[var(--color-border)] my-1"></div>
                <button
                  onClick={() => {
                    // Handle logout logic here
                    console.log('Déconnexion')
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Se déconnecter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
