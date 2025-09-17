"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, Menu, X } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search functionality
    console.log('Searching for:', searchQuery)
  }

  const navItems = [
    { label: "Trade", href: "#trade", description: "Start trading cryptocurrencies" },
    { label: "Explore", href: "#explore", description: "Discover tokens and pools" },
    { label: "Pool", href: "#pool", description: "Provide liquidity and earn rewards" }
  ]

  return (
    <nav
      className="relative z-20 bg-black/40 backdrop-blur-xl border-b border-white/5 nav-backdrop"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500 shadow-lg"
              aria-hidden="true"
            ></div>
            <span className="text-xl font-bold text-white">SmoothSend</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="text-white hover:text-emerald-400 hover:bg-white/10 transition-all duration-200 hover:shadow-lg hover:scale-105 focus-visible-emerald"
                aria-label={item.description}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <form 
              onSubmit={handleSearch}
              className="hidden lg:flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-all duration-200 focus-within:ring-2 focus-within:ring-emerald-400/50"
            >
              <Search className="w-4 h-4 text-gray-400 mr-2" aria-hidden="true" />
              <input
                id="search-tokens"
                name="search"
                type="text"
                placeholder="Search tokens and pools"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white placeholder-gray-400 outline-none focus:placeholder-gray-300 transition-colors w-48"
                aria-label="Search tokens and pools"
              />
            </form>

            {/* Get App Button */}
            <Button
              variant="ghost"
              className="hidden sm:flex text-white hover:bg-white/10 transition-all duration-200 hover:shadow-lg hover:scale-105 focus-visible-emerald"
              aria-label="Get the mobile app"
            >
              Get the app
            </Button>

            {/* Connect Button */}
            <Button
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus-visible-emerald active:scale-95"
              aria-label="Connect wallet"
            >
              Connect
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-emerald-400 transition-colors focus-visible-emerald p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="text-white hover:text-emerald-400 hover:bg-white/10 justify-start focus-visible-emerald"
                  aria-label={item.description}
                >
                  {item.label}
                </Button>
              ))}
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="pt-4">
                <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3">
                  <Search className="w-4 h-4 text-gray-400 mr-3" aria-hidden="true" />
                  <input
                    id="mobile-search-tokens"
                    name="search"
                    type="text"
                    placeholder="Search tokens and pools"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-white placeholder-gray-400 outline-none focus:placeholder-gray-300 transition-colors flex-1"
                    aria-label="Search tokens and pools"
                  />
                </div>
              </form>

              <Button
                variant="ghost"
                className="text-white hover:text-emerald-400 hover:bg-white/10 justify-start mt-2 focus-visible-emerald"
                aria-label="Get the mobile app"
              >
                Get the app
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
