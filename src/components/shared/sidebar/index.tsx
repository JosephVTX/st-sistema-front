'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package,  TagIcon } from 'lucide-react'


const navItems = [
  {
    href: '/dashboard/categories',
    icon: TagIcon,
    label: 'Categorías'
  },
  {
    href: '/dashboard/products',
    icon: Package,
    label: 'Productos'
  },
  

]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-tertiary fixed top-0 left-0 h-screen w-80 duration-300 z-50 group max-sm:-translate-x-full max-sm:peer-checked:translate-x-0 overflow-hidden sm:after:absolute sm:after:inset-y-0 sm:after:right-0 sm:after:w-8 sm:after:bg-white sm:after:rounded-l-full">
      <div className="p-8">
        <h1 className="text-3xl text-white">LOGO</h1>
      </div>

      <nav className="flex flex-col flex-1 mt-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-4 px-8 py-4 hover:bg-white hover:text-black ${pathname === item.href ? 'bg-white text-black' : 'text-white'
              }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
