"use client"

import { ChevronDown, ArrowRight } from "lucide-react"
import { SwapWidget } from "./swap-widget"
import { Section, Container } from "./ui/layout"
import { Button } from "./ui/button"

export function HeroSection() {
  const handleScrollToContent = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })
  }

  const handleGetStarted = () => {
    const swapWidget = document.getElementById('swap-widget')
    if (swapWidget) {
      swapWidget.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Section 
      className="flex flex-col items-center justify-center min-h-[85vh] pt-8 md:pt-12"
      id="main-content"
      ariaLabel="Hero section with main heading and swap interface"
    >
      <Container className="text-center">
        <header className="content-spacing max-w-5xl mx-auto">
          <h1 className="hero-text text-balance text-white mb-6" id="main-heading">
            Swap anytime,
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
              anywhere.
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto text-pretty leading-relaxed">
            Buy and sell crypto seamlessly on <strong className="text-emerald-400 font-semibold">14+ networks</strong> including 
            Ethereum, Unichain, and Base with the power of SmoothSend.
          </p>
          
                    {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button
              onClick={handleGetStarted}
              className="btn-primary group flex items-center gap-2"
              aria-label="Get started with token swapping"
            >
              Get started now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => window.open('https://docs.smoothsend.com', '_blank')}
              className="btn-secondary group flex items-center gap-2"
              aria-label="Read documentation"
            >
              Read docs
            </Button>
          </div>
        </header>

        <div className="mt-12 md:mt-16" id="swap-widget">
          <SwapWidget />
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-gray-400 mb-4 text-sm md:text-base font-medium">
            Discover more features below
          </p>
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-emerald-400 transition-all duration-300 focus-visible-emerald rounded-lg p-3 hover:scale-110 group"
            onClick={handleScrollToContent}
            aria-label="Scroll down to learn more about SmoothSend features"
          >
            <ChevronDown className="w-6 h-6 mx-auto animate-bounce group-hover:animate-pulse" />
          </Button>
        </div>
      </Container>
    </Section>
  )
}
