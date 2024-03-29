import React from 'react'
import { Actions } from './actions'
import { ModeToggle } from '@/components/theme-toggle'
import { NavLinks } from './navigation'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] px-2 lg:px-4 flex justify-between items-center shadow-sm">
            {/* <Logo/>
            <Search/>
             */}
        <Actions/>
        <NavLinks/>
        <ModeToggle/>
    </nav>
  )
}
