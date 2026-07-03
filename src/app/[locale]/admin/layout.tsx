import { Link } from '@/i18n/routing'
import { LogOut, LayoutDashboard, MessageSquare, Star, Map, Compass } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080808] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0C0C0C] border-r border-[var(--brand-gold)]/10 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-[var(--brand-gold)]/10">
          <Link href="/admin" className="font-display font-bold text-lg text-[var(--brand-gold)]">
            Be Flex Admin
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/inquiries" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <MessageSquare className="w-5 h-5" />
            Inquiries
          </Link>
          <Link href="/admin/reviews" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <Star className="w-5 h-5" />
            Reviews
          </Link>
          <div className="pt-4 pb-2">
            <div className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Content</div>
          </div>
          <Link href="/admin/activities" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <Compass className="w-5 h-5" />
            Activities
          </Link>
          <Link href="/admin/excursions" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors">
            <Map className="w-5 h-5" />
            Excursions
          </Link>
        </nav>

        <div className="p-4 border-t border-[var(--brand-gold)]/10">
          <form action="/auth/signout" method="post">
            <button type="submit" className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors text-left">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="h-16 md:hidden flex items-center px-4 border-b border-[var(--brand-gold)]/10 bg-[#0C0C0C]">
          <Link href="/admin" className="font-display font-bold text-lg text-[var(--brand-gold)]">
            Be Flex Admin
          </Link>
        </header>
        
        <div className="flex-1 p-6 md:p-10 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
