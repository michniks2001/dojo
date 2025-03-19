"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <nav className='sticky top-0 z-50 w-full bg-white border-b border-[#DDDDDD] font-["Montserrat"]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo and Main Nav */}
          <div className='flex items-center'>
            <Link
              href='/home'
              className='text-xl font-bold text-[#C1272D] mr-8'
            >
              Dojo
            </Link>
            <div className='hidden md:flex items-center space-x-4'>
              <NavLink href='/home' active={isActive("/home")}>
                Home
              </NavLink>
              <NavLink href='/events' active={isActive("/events")}>
                Events
              </NavLink>
              <NavLink href='/gyms' active={isActive("/gyms")}>
                Gyms
              </NavLink>
              <NavLink href='/sparring' active={isActive("/sparring")}>
                Sparring
              </NavLink>
              <NavLink href='/live' active={isActive("/live")}>
                Live
              </NavLink>
            </div>
          </div>

          {/* Search Bar */}
          <div className='hidden md:flex flex-1 max-w-md mx-4'>
            <div className='relative w-full'>
              <Input
                type='text'
                placeholder='Search Dojo...'
                className='w-full bg-[#F5F5F5] border-[#DDDDDD] pl-10 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
              />
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#333333] h-4 w-4' />
            </div>
          </div>

          {/* Right Side Nav */}
          <div className='flex items-center space-x-4'>
            <button className='text-[#333333] hover:text-[#C1272D]'>
              <Bell className='h-5 w-5' />
            </button>

            {/* Mobile Menu */}
            <div className='md:hidden'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <Menu className='h-5 w-5' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-48'>
                  <DropdownMenuItem>
                    <Link href='/home' className='w-full'>
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/events' className='w-full'>
                      Events
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/gyms' className='w-full'>
                      Gyms
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/sparring' className='w-full'>
                      Sparring
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href='/live' className='w-full'>
                      Live
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-bold transition-colors duration-200 ${
        active
          ? "text-[#C1272D] bg-[#F5F5F5]"
          : "text-[#333333] hover:text-[#C1272D] hover:bg-[#F5F5F5]"
      }`}
    >
      {children}
    </Link>
  );
}
